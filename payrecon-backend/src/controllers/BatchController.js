import mongoose from "mongoose";
import fs from "fs";

import Batch from "../models/Batch.js";
import generateBatchId from "../utils/generateBatchId.js";
import BatchFile from "../models/BatchFile.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import { readExcelFile } from "../services/excelService.js";
import validateLedger from "../services/validateLedger.js";
import validateBank from "../services/validateBank.js";
import BankTransaction from "../models/BankTransaction.js";
import LedgerTransaction from "../models/LedgerTransaction.js";
import reconcileTransactions from "../services/reconcileTransactions.js";
import { createAuditLog } from "../services/auditService.js";
import crypto from "crypto";
import IngestionJob from "../models/IngestionJob.js";

const getDateOnly = (value) => {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString().split("T")[0];
};

// to create a new batch
export const createBatch = async (req, res) => {
  try {
    const { batchName } = req.body;

    if (!batchName) {
      return res.status(400).json({
        success: false,
        message: "Batch name is required",
      });
    }

    const batchId = await generateBatchId();

    const batch = await Batch.create({
      batchId,
      batchName,

      createdBy: req.user._id,

      createdByName: req.user.name,
    });

    await createAuditLog({
      action: "BATCH_CREATED",
      description: `Created batch ${batch.batchId}`,
      performedBy: req.user._id,
      role: req.user.role,
      batchId: batch._id,
      req,
    });

    res.status(201).json({
      success: true,
      message: "Batch created successfully",
      batch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// to get all the available batches
export const getBatches = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { role, _id } = req.user;
    const { status } = req.query;

    let query = {};

    switch (role) {
      case "ADMIN":
        query = {};
        break;

      case "MAKER":
        query = {
          createdBy: _id,
        };
        break;

      case "CHECKER":
        query = {
          status: {
            $in: ["SUBMITTED", "UNDER_REVIEW", "APPROVED", "REJECTED"],
          },
        };
        break;

      default:
        return res.status(403).json({
          success: false,
          message: "Unauthorized role",
        });
    }

    // Apply status filter
    if (status && status !== "ALL") {
      query.status = status;
    }

    const totalBatches = await Batch.countDocuments(query);

    const batches = await Batch.find(query)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const progressMap = {
      DRAFT: 10,
      PARTIAL_UPLOAD: 30,
      UPLOADED: 50,
      SUBMITTED: 70,
      UNDER_REVIEW: 85,
      APPROVED: 100,
      REJECTED: 100,
      RECONCILED: 100,
    };

    const formattedBatches = batches.map((batch) => {
      // Transactions = actual ledger transactions in the batch
      const transactions = batch.totalLedgerTransactions || 0;

      return {
        _id: batch._id,
        batchId: batch.batchId,
        batchName: batch.batchName,
        status: batch.status,

        // Creator Information
        createdBy: batch.createdBy?._id || null,
        createdByName: batch.createdBy?.name || "N/A",
        createdByEmail: batch.createdBy?.email || "",

        // Dates
        createdAt: batch.createdAt,
        updatedAt: batch.updatedAt,

        // Transaction counts
        totalLedgerTransactions: batch.totalLedgerTransactions || 0,
        totalBankTransactions: batch.totalBankTransactions || 0,

        // Reconciliation counts
        matchedTransactions: batch.matchedTransactions || 0,
        amountMismatchCount: batch.amountMismatchCount || 0,
        dateMismatchCount: batch.dateMismatchCount || 0,
        missingInBankCount: batch.missingInBankCount || 0,
        missingInLedgerCount: batch.missingInLedgerCount || 0,

        // Calculated fields
        transactions,
        progress: progressMap[batch.status] || 0,
      };
    });

    return res.status(200).json({
      success: true,
      count: formattedBatches.length,
      page,
      totalPages: Math.ceil(totalBatches / limit),
      batches: formattedBatches,
    });
  } catch (error) {
    console.error("Get Batches Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// to get a specific batch by its id
export const getBatchById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid batch ID",
      });
    }

    const batch = await Batch.findById(req.params.id);

    if (!batch) {
      return res.status(404).json({
        success: false,
        message: "Batch not found",
      });
    }

    res.status(200).json({
      success: true,
      batch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// to upload a ledger file to a specific batch
export const uploadLedgerFile = async (req, res) => {
  let batchFile = null;
  let ingestionJob = null;

  try {
    // Check if Batch ID is valid
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Batch ID",
      });
    }

    // Check if batch exists
    const batch = await Batch.findById(req.params.id);

    if (!batch) {
      return res.status(404).json({
        success: false,
        message: "Batch not found",
      });
    }

    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // 1. Generate SHA-256 checksum
    const fileBuffer = fs.readFileSync(req.file.path);

    const checksum = crypto
      .createHash("sha256")
      .update(fileBuffer)
      .digest("hex");

    // 2. Check duplicate file
    const existingFile = await BatchFile.findOne({
      batchId: batch._id,
      fileType: "LEDGER",
      checksum,
      isActive: true,
    });

    if (existingFile) {
      return res.status(409).json({
        success: false,
        message:
          "This exact Ledger file has already been uploaded for this batch.",
      });
    }

    // 3. Prevent another Ledger upload for same batch
    const existingTransactions = await LedgerTransaction.countDocuments({
      batchId: batch._id,
    });

    if (existingTransactions > 0) {
      return res.status(400).json({
        success: false,
        message: "Ledger file has already been uploaded for this batch.",
      });
    }

    // 4. Save uploaded file metadata
    batchFile = await BatchFile.create({
      batchId: batch._id,
      uploadedBy: req.user._id,

      fileType: "LEDGER",
      version: 1,
      isActive: true,

      originalFileName: req.file.originalname,
      storedFileName: req.file.filename,
      filePath: req.file.path,

      mimeType: req.file.mimetype,
      fileSize: req.file.size,

      checksum,

      sourceMetadata: {
        originalName: req.file.originalname,
        uploadedAt: new Date(),
        uploadedBy: req.user._id,
        mimeType: req.file.mimetype,
        fileSize: req.file.size,
      },

      uploadStatus: "PROCESSING",
    });

    // 5. Create ingestion job
    ingestionJob = await IngestionJob.create({
      jobId: `ING-${Date.now()}-${batchFile._id.toString().slice(-6)}`,

      batchId: batch._id,
      batchFileId: batchFile._id,

      fileType: "LEDGER",

      status: "RECEIVED",

      startedAt: new Date(),
    });

    // Link ingestion job to file
    batchFile.ingestionJobId = ingestionJob._id;
    await batchFile.save();

    // 6. PARSING
    ingestionJob.status = "PARSING";
    await ingestionJob.save();

    const rows = readExcelFile(req.file.path);

    ingestionJob.totalRows = rows.length;
    await ingestionJob.save();

    // 7. VALIDATING
    ingestionJob.status = "VALIDATING";
    await ingestionJob.save();

    const validation = validateLedger(rows);

    // 8. Handle validation failure
    if (!validation.isValid) {
      ingestionJob.status = "FAILED";

      ingestionJob.invalidRecords = validation.invalidRows;

      ingestionJob.errors = [
        ...validation.fileErrors.map((message) => ({
          row: null,
          field: null,
          message,
        })),

        ...validation.rowErrors.map((error) => ({
          row: error.row,
          field: error.field || null,
          message:
            error.message ||
            (error.errors ? error.errors.join(", ") : "Invalid row"),
        })),
      ];

      ingestionJob.errorMessage = "Ledger file validation failed";

      ingestionJob.completedAt = new Date();

      ingestionJob.processingDurationMs =
        ingestionJob.completedAt.getTime() - ingestionJob.startedAt.getTime();

      await ingestionJob.save();

      batchFile.uploadStatus = "FAILED";
      await batchFile.save();

      await createAuditLog({
        action: "LEDGER_UPLOADED",
        description: `Ledger file validation failed (${req.file.originalname})`,
        performedBy: req.user._id,
        role: req.user.role,
        batchId: batch._id,
        status: "FAILED",
        metadata: {
          fileName: req.file.originalname,
          checksum,
          ingestionJobId: ingestionJob.jobId,
          totalRows: validation.totalRows,
          invalidRecords: validation.invalidRows,
          fileErrors: validation.fileErrors,
          rowErrors: validation.rowErrors,
        },
        req,
      });

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        ingestionJobId: ingestionJob.jobId,
        fileErrors: validation.fileErrors,
        rowErrors: validation.rowErrors,
        warnings: validation.warnings,
      });
    }

    // 9. TRANSFORMING
    ingestionJob.status = "TRANSFORMING";
    await ingestionJob.save();

    const ledgerTransactions = rows.map((row, index) => ({
      batchId: batch._id,

      sourceFileId: batchFile._id,

      ingestionJobId: ingestionJob._id,

      sourceRowNumber: index + 2,

      transactionId:
        row["Transaction ID"] === undefined ||
        row["Transaction ID"] === null ||
        String(row["Transaction ID"]).trim() === ""
          ? ""
          : String(row["Transaction ID"]).trim(),

      referenceNumber:
        row["Reference Number"] === undefined ||
        row["Reference Number"] === null ||
        String(row["Reference Number"]).trim() === ""
          ? ""
          : String(row["Reference Number"]).trim(),

      transactionDate: new Date(row["Transaction Date"]),

      amount: Number(row["Amount"]),

      status: "PENDING",
    }));

    // 10. DEDUPLICATING
    ingestionJob.status = "DEDUPLICATING";
    await ingestionJob.save();

    const transactionIdentities = new Set();

    const uniqueLedgerTransactions = [];

    let duplicateRecords = 0;

    for (const transaction of ledgerTransactions) {
      const transactionDate = getDateOnly(transaction.transactionDate);

      const identity = [
        transaction.transactionId,
        transaction.referenceNumber,
        transactionDate,
        transaction.amount,
      ].join("|");

      if (transactionIdentities.has(identity)) {
        duplicateRecords++;
      } else {
        transactionIdentities.add(identity);
        uniqueLedgerTransactions.push(transaction);
      }
    }

    // 11. LOADING
    ingestionJob.status = "LOADING";
    await ingestionJob.save();

    if (uniqueLedgerTransactions.length > 0) {
      await LedgerTransaction.insertMany(uniqueLedgerTransactions);
    }

    // 12. Update ingestion statistics
    ingestionJob.validRecords = uniqueLedgerTransactions.length;

    ingestionJob.invalidRecords = validation.invalidRows;

    ingestionJob.duplicateRecords = duplicateRecords;

    // 13. Update batch
    batch.files.push(batchFile._id);

    batch.totalLedgerTransactions = uniqueLedgerTransactions.length;

    if (batch.totalBankTransactions > 0) {
      batch.status = "UPLOADED";
    } else {
      batch.status = "PARTIAL_UPLOAD";
    }

    await batch.save();

    // 14. Complete ingestion
    ingestionJob.status = "COMPLETED";

    ingestionJob.completedAt = new Date();

    ingestionJob.processingDurationMs =
      ingestionJob.completedAt.getTime() - ingestionJob.startedAt.getTime();

    await ingestionJob.save();

    // 15. Update BatchFile
    batchFile.uploadStatus = "PROCESSED";

    await batchFile.save();

    // // 16. Delete temporary local file
    // if (fs.existsSync(req.file.path)) {
    //   fs.unlinkSync(req.file.path);
    // }

    // 17. Audit
    await createAuditLog({
      action: "LEDGER_UPLOADED",

      description: `Uploaded ledger file (${req.file.originalname})`,

      performedBy: req.user._id,

      role: req.user.role,

      batchId: batch._id,

      metadata: {
        fileName: req.file.originalname,

        checksum,

        ingestionJobId: ingestionJob.jobId,

        totalRows: rows.length,

        totalTransactions: uniqueLedgerTransactions.length,

        invalidRecords: validation.invalidRows,

        duplicateRecords,
      },

      req,
    });

    // 18. Response
    return res.status(200).json({
      success: true,

      message: "Ledger uploaded successfully",

      ingestionJobId: ingestionJob.jobId,

      totalRows: rows.length,

      validRecords: uniqueLedgerTransactions.length,

      invalidRecords: validation.invalidRows,

      duplicateRecords,

      totalTransactions: uniqueLedgerTransactions.length,

      batch,

      batchFile,

      ingestionJob,
    });
  } catch (error) {
    console.error("Ledger ingestion error:", error);

    // If an ingestion job was created, mark it as FAILED
    if (ingestionJob) {
      try {
        ingestionJob.status = "FAILED";

        ingestionJob.errorMessage = error.message;

        ingestionJob.completedAt = new Date();

        if (ingestionJob.startedAt) {
          ingestionJob.processingDurationMs =
            ingestionJob.completedAt.getTime() -
            ingestionJob.startedAt.getTime();
        }

        ingestionJob.errors = [
          {
            row: null,
            field: null,
            message: error.message,
          },
        ];

        await ingestionJob.save();
      } catch (updateError) {
        console.error("Failed to update Ledger ingestion job:", updateError);
      }
    }

    // Mark uploaded file as FAILED
    if (batchFile) {
      try {
        batchFile.uploadStatus = "FAILED";
        await batchFile.save();
      } catch (updateError) {
        console.error("Failed to update Ledger BatchFile:", updateError);
      }
    }

    // Delete temporary uploaded file
    if (req.file?.path && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (deleteError) {
        console.error("Failed to delete Ledger temporary file:", deleteError);
      }
    }

    return res.status(400).json({
      success: false,
      message: error.message,
      ingestionJobId: ingestionJob?.jobId || null,
    });
  }
};

// to upload a bank file to a specific batch
export const uploadBankFile = async (req, res) => {
  let batchFile = null;
  let ingestionJob = null;

  try {
    // 1. Validate Batch ID

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Batch ID",
      });
    }

    // 2. Find Batch

    const batch = await Batch.findById(req.params.id);

    if (!batch) {
      return res.status(404).json({
        success: false,
        message: "Batch not found",
      });
    }

    // 3. Check file

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // 4. Generate SHA-256 checksum

    const fileBuffer = fs.readFileSync(req.file.path);

    const checksum = crypto
      .createHash("sha256")
      .update(fileBuffer)
      .digest("hex");

    // 5. Check duplicate file

    const existingFile = await BatchFile.findOne({
      batchId: batch._id,
      fileType: "BANK",
      checksum,
      isActive: true,
    });

    if (existingFile) {
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(409).json({
        success: false,
        message:
          "This exact Bank file has already been uploaded for this batch.",
      });
    }

    // 6. Prevent another Bank upload for same batch

    const existingTransactions = await BankTransaction.countDocuments({
      batchId: batch._id,
    });

    if (existingTransactions > 0) {
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(400).json({
        success: false,
        message: "Bank file has already been uploaded for this batch.",
      });
    }

    // 7. Save BatchFile

    batchFile = await BatchFile.create({
      batchId: batch._id,

      fileType: "BANK",

      version: 1,

      isActive: true,

      uploadedBy: req.user._id,

      originalFileName: req.file.originalname,

      storedFileName: req.file.filename,

      filePath: req.file.path,

      mimeType: req.file.mimetype,

      fileSize: req.file.size,

      checksum,

      sourceMetadata: {
        originalName: req.file.originalname,
        uploadedAt: new Date(),
        uploadedBy: req.user._id,
        mimeType: req.file.mimetype,
        fileSize: req.file.size,
      },

      uploadStatus: "PROCESSING",
    });

    // 8. Create Ingestion Job

    ingestionJob = await IngestionJob.create({
      jobId: `ING-${Date.now()}-${batchFile._id.toString().slice(-6)}`,

      batchId: batch._id,

      batchFileId: batchFile._id,

      fileType: "BANK",

      status: "RECEIVED",

      startedAt: new Date(),
    });

    // Link job to BatchFile
    batchFile.ingestionJobId = ingestionJob._id;

    await batchFile.save();

    // 9. PARSING

    ingestionJob.status = "PARSING";

    await ingestionJob.save();

    const rows = readExcelFile(req.file.path);

    ingestionJob.totalRows = rows.length;

    await ingestionJob.save();

    // 10. VALIDATING

    ingestionJob.status = "VALIDATING";

    await ingestionJob.save();

    const validation = validateBank(rows);

    // 11. Handle validation failure

    if (!validation.isValid) {
      ingestionJob.status = "FAILED";

      ingestionJob.invalidRecords = validation.invalidRows || 0;

      ingestionJob.errors = [
        ...validation.fileErrors.map((message) => ({
          row: null,
          field: null,
          message,
        })),

        ...validation.rowErrors.map((error) => ({
          row: error.row,
          field: error.field || null,
          message:
            error.message ||
            (error.errors ? error.errors.join(", ") : "Invalid row"),
        })),
      ];

      ingestionJob.errorMessage = "Bank file validation failed";

      ingestionJob.completedAt = new Date();

      ingestionJob.processingDurationMs =
        ingestionJob.completedAt.getTime() - ingestionJob.startedAt.getTime();

      await ingestionJob.save();

      batchFile.uploadStatus = "FAILED";

      await batchFile.save();

      await createAuditLog({
        action: "BANK_UPLOADED",

        description: `Bank file validation failed (${req.file.originalname})`,

        performedBy: req.user._id,

        role: req.user.role,

        batchId: batch._id,

        status: "FAILED",

        metadata: {
          fileName: req.file.originalname,
          checksum,
          ingestionJobId: ingestionJob.jobId,
          totalRows: rows.length,
          invalidRecords: validation.invalidRows || 0,
        },

        req,
      });

      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(400).json({
        success: false,

        message: "Validation failed",

        ingestionJobId: ingestionJob.jobId,

        fileErrors: validation.fileErrors,

        rowErrors: validation.rowErrors,

        warnings: validation.warnings,
      });
    }

    // 12. TRANSFORMING

    ingestionJob.status = "TRANSFORMING";

    await ingestionJob.save();

    const bankTransactions = rows.map((row, index) => ({
      batchId: batch._id,

      sourceFileId: batchFile._id,

      ingestionJobId: ingestionJob._id,

      sourceRowNumber: index + 2,

      referenceNumber:
        row["Reference Number"] === undefined ||
        row["Reference Number"] === null ||
        String(row["Reference Number"]).trim() === ""
          ? ""
          : String(row["Reference Number"]).trim(),

      transactionType:
        row["Transaction Type"] === undefined ||
        row["Transaction Type"] === null ||
        String(row["Transaction Type"]).trim() === ""
          ? ""
          : String(row["Transaction Type"]).trim(),

      transactionDate: new Date(row["Transaction Date"]),

      amount: Number(row["Amount"]),

      status: "PENDING",
    }));

    // 13. DEDUPLICATING

    ingestionJob.status = "DEDUPLICATING";

    await ingestionJob.save();

    const transactionIdentities = new Set();

    const uniqueBankTransactions = [];

    let duplicateRecords = 0;

    for (const transaction of bankTransactions) {
      const transactionDate = getDateOnly(transaction.transactionDate);

      const identity = [
        transaction.referenceNumber,
        transactionDate,
        transaction.amount,
        transaction.transactionType,
      ].join("|");

      if (transactionIdentities.has(identity)) {
        duplicateRecords++;
      } else {
        transactionIdentities.add(identity);

        uniqueBankTransactions.push(transaction);
      }
    }

    // 14. LOADING

    ingestionJob.status = "LOADING";

    await ingestionJob.save();

    if (uniqueBankTransactions.length > 0) {
      await BankTransaction.insertMany(uniqueBankTransactions);
    }

    // 15. Update ingestion statistics

    ingestionJob.validRecords = uniqueBankTransactions.length;

    ingestionJob.invalidRecords = validation.invalidRows || 0;

    ingestionJob.duplicateRecords = duplicateRecords;

    // 16. Update Batch

    batch.files.push(batchFile._id);

    batch.totalBankTransactions = uniqueBankTransactions.length;

    if (batch.totalLedgerTransactions > 0) {
      batch.status = "UPLOADED";
    } else {
      batch.status = "PARTIAL_UPLOAD";
    }

    await batch.save();

    // 17. Complete ingestion

    ingestionJob.status = "COMPLETED";

    ingestionJob.completedAt = new Date();

    ingestionJob.processingDurationMs =
      ingestionJob.completedAt.getTime() - ingestionJob.startedAt.getTime();

    await ingestionJob.save();

    // 18. Update BatchFile

    batchFile.uploadStatus = "PROCESSED";

    await batchFile.save();

    // // 19. Delete temporary local file
    // if (fs.existsSync(req.file.path)) {
    //   fs.unlinkSync(req.file.path);
    // }

    // 20. Audit

    await createAuditLog({
      action: "BANK_UPLOADED",

      description: `Uploaded bank file (${req.file.originalname})`,

      performedBy: req.user._id,

      role: req.user.role,

      batchId: batch._id,

      metadata: {
        fileName: req.file.originalname,

        checksum,

        ingestionJobId: ingestionJob.jobId,

        totalRows: rows.length,

        totalTransactions: uniqueBankTransactions.length,

        invalidRecords: validation.invalidRows || 0,

        duplicateRecords,
      },

      req,
    });

    // 21. Response
    return res.status(200).json({
      success: true,

      message: "Bank uploaded successfully",

      ingestionJobId: ingestionJob.jobId,

      totalRows: rows.length,

      validRecords: uniqueBankTransactions.length,

      invalidRecords: validation.invalidRows || 0,

      duplicateRecords,

      totalTransactions: uniqueBankTransactions.length,

      batch,

      batchFile,

      ingestionJob,
    });
  } catch (error) {
    console.error("Bank ingestion error:", error);

    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// reconciliation engine controller
export const reconcileBatch = async (req, res) => {
  try {
    const batchId = req.params.id;

    // 1. Check if batch exists
    const batch = await Batch.findById(batchId);

    if (!batch) {
      return res.status(404).json({
        success: false,
        message: "Batch not found",
      });
    }

    // 2. Audit - reconciliation started
    await createAuditLog({
      action: "RECONCILIATION_STARTED",

      description: `Started reconciliation for batch ${batch.batchId}`,

      performedBy: req.user._id,

      role: req.user.role,

      batchId: batch._id,

      status: "SUCCESS",

      req,
    });

    // 3. Run reconciliation engine
    const result = await reconcileTransactions(batchId);

    // 4. Audit - reconciliation completed
    await createAuditLog({
      action: "RECONCILIATION_COMPLETED",

      description: `Reconciliation completed for batch ${batch.batchId}`,

      performedBy: req.user._id,

      role: req.user.role,

      batchId: batch._id,

      status: "SUCCESS",

      metadata: {
        matched: result.matched,
        amountMismatch: result.amountMismatch,
        dateMismatch: result.dateMismatch,
        missingInBank: result.missingInBank,
        missingInLedger: result.missingInLedger,
        totalLedgerTransactions: result.totalLedgerTransactions,
        totalBankTransactions: result.totalBankTransactions,
      },

      req,
    });

    // 5. Return reconciliation result
    return res.status(200).json({
      success: true,

      message: "Reconciliation completed successfully",

      batchId: batch._id,

      ...result,
    });
  } catch (error) {
    console.error("Reconciliation error:", error);

    // 6. Audit - reconciliation failed
    try {
      const batch = await Batch.findById(req.params.id);

      if (batch) {
        await createAuditLog({
          action: "RECONCILIATION_FAILED",

          description: `Reconciliation failed for batch ${batch.batchId}`,

          performedBy: req.user._id,

          role: req.user.role,

          batchId: batch._id,

          status: "FAILED",

          metadata: {
            error: error.message,
          },

          req,
        });
      }
    } catch (auditError) {
      console.error(
        "Failed to create reconciliation failure audit log:",
        auditError,
      );
    }

    return res.status(500).json({
      success: false,
      message: "Reconciliation failed",
      error: error.message,
    });
  }
};

// to get the summary after reconciliation
export const getReconciliationSummary = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if batch exists
    const batch = await Batch.findById(id);

    if (!batch) {
      return res.status(404).json({
        success: false,
        message: "Batch not found",
      });
    }

    // Total reconciliation exceptions
    const totalExceptions =
      batch.amountMismatchCount +
      batch.dateMismatchCount +
      batch.missingInBankCount +
      batch.missingInLedgerCount;

    // Calculate match percentage based on total ledger transactions
    const matchPercentage =
      batch.totalLedgerTransactions === 0
        ? 0
        : Number(
            (
              (batch.matchedTransactions / batch.totalLedgerTransactions) *
              100
            ).toFixed(2),
          );

    return res.status(200).json({
      success: true,

      batch: {
        _id: batch._id,
        batchId: batch.batchId,
        batchName: batch.batchName,
        status: batch.status,
        createdBy: batch.createdBy,
        createdByName: batch.createdByName,
        createdAt: batch.createdAt,
        updatedAt: batch.updatedAt,
      },

      summary: {
        totalLedgerTransactions: batch.totalLedgerTransactions,
        totalBankTransactions: batch.totalBankTransactions,

        matchedTransactions: batch.matchedTransactions,
        amountMismatchCount: batch.amountMismatchCount,
        dateMismatchCount: batch.dateMismatchCount,
        missingInBankCount: batch.missingInBankCount,
        missingInLedgerCount: batch.missingInLedgerCount,

        totalExceptions,
        matchPercentage,
      },
    });
  } catch (error) {
    console.error("Get reconciliation summary error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get reconciliation results for a batch
export const getReconciliationResults = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if batch exists
    const batch = await Batch.findById(id);

    if (!batch) {
      return res.status(404).json({
        success: false,
        message: "Batch not found",
      });
    }

    // Fetch ledger transactions
    const ledgerTransactions = await LedgerTransaction.find({
      batchId: batch._id,
    }).sort({ sourceRowNumber: 1 });

    // Fetch bank transactions
    const bankTransactions = await BankTransaction.find({
      batchId: batch._id,
    }).sort({ sourceRowNumber: 1 });

    return res.status(200).json({
      success: true,

      batch: {
        _id: batch._id,
        batchId: batch.batchId,
        batchName: batch.batchName,
        status: batch.status,
      },

      summary: {
        totalLedgerTransactions: ledgerTransactions.length,
        totalBankTransactions: bankTransactions.length,

        matchedTransactions: batch.matchedTransactions,
        amountMismatchCount: batch.amountMismatchCount,
        dateMismatchCount: batch.dateMismatchCount,
        missingInBankCount: batch.missingInBankCount,
        missingInLedgerCount: batch.missingInLedgerCount,
      },

      ledgerTransactions,
      bankTransactions,
    });
  } catch (error) {
    console.error("Get reconciliation results error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// to get the batch details
export const getBatchDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if batch exists
    const batch = await Batch.findById(id);

    if (!batch) {
      return res.status(404).json({
        success: false,
        message: "Batch not found",
      });
    }

    // Fetch uploaded files
    const files = await BatchFile.find({
      batchId: id,
    });

    // Fetch ledger transactions
    const ledgerTransactions = await LedgerTransaction.find({
      batchId: id,
    });

    // Fetch bank transactions
    const bankTransactions = await BankTransaction.find({
      batchId: id,
    });

    // Calculate summary
    const summary = {
      totalLedgerTransactions: ledgerTransactions.length,
      totalBankTransactions: bankTransactions.length,

      matched: ledgerTransactions.filter(
        (t) => t.reconciliationStatus === "MATCHED",
      ).length,

      amountMismatch: ledgerTransactions.filter(
        (t) => t.reconciliationStatus === "AMOUNT_MISMATCH",
      ).length,

      dateMismatch: ledgerTransactions.filter(
        (t) => t.reconciliationStatus === "DATE_MISMATCH",
      ).length,

      missingInBank: ledgerTransactions.filter(
        (t) => t.reconciliationStatus === "MISSING_IN_BANK",
      ).length,

      missingInLedger: bankTransactions.filter(
        (t) => t.reconciliationStatus === "MISSING_IN_LEDGER",
      ).length,
    };

    return res.status(200).json({
      success: true,
      batch,
      summary,
      files,
      ledgerTransactions,
      bankTransactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// to let maker submit the reconciled batch
export const submitBatch = async (req, res) => {
  try {
    const { id } = req.params;

    const batch = await Batch.findById(id);

    if (!batch) {
      return res.status(404).json({
        success: false,
        message: "Batch not found",
      });
    }

    if (batch.status !== "RECONCILED") {
      return res.status(400).json({
        success: false,
        message: "Only reconciled batches can be submitted.",
      });
    }

    batch.status = "SUBMITTED";
    batch.submittedBy = req.user._id;
    batch.submittedAt = new Date();

    await batch.save();

    await createAuditLog({
      action: "BATCH_SUBMITTED",
      description: `Submitted batch ${batch.batchId} for review`,
      performedBy: req.user._id,
      role: req.user.role,
      batchId: batch._id,
      req,
    });

    return res.status(200).json({
      success: true,
      message: "Batch submitted for checker review successfully.",
      batch,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// to get all the pending batches for review
export const getPendingReviewBatches = async (req, res) => {
  try {
    console.log("Controller reached");
    const batches = await Batch.find({
      status: "SUBMITTED",
    })
      .populate("submittedBy", "name email")
      .sort({ submittedAt: -1 });

    return res.status(200).json({
      success: true,
      total: batches.length,
      batches,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// to approve the submitted batch
export const approveBatch = async (req, res) => {
  try {
    // check if batch exists
    const { id } = req.params;

    const batch = await Batch.findById(id);

    if (!batch) {
      return res.status(404).json({
        success: false,
        message: "Batch not found",
      });
    }

    // Only submitted batch can be approved
    if (batch.status !== "SUBMITTED") {
      return res.status(400).json({
        success: false,
        message: "Only submitted batches can be approved.",
      });
    }

    // update status
    batch.status = "APPROVED";

    batch.reviewedBy = req.user._id;
    batch.reviewedAt = new Date();

    batch.approvedBy = req.user._id;
    batch.approvedAt = new Date();

    // save batch
    await batch.save();

    await createAuditLog({
      action: "BATCH_APPROVED",
      description: `Approved batch ${batch.batchId}`,
      performedBy: req.user._id,
      role: req.user.role,
      batchId: batch._id,
      req,
    });

    return res.status(200).json({
      success: true,
      message: "Batch approved successfully.",
      batch,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// to reject the sumitted batch
export const rejectBatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { remarks } = req.body || {};

    // check if batch exists
    const batch = await Batch.findById(id);
    if (!batch) {
      return res.status(404).json({
        success: false,
        message: "Batch not found",
      });
    }

    // Only submitted batches can be rejected
    if (batch.status !== "SUBMITTED") {
      return res.status(400).json({
        success: false,
        message: "Only submitted batches can be rejected.",
      });
    }

    // if rejection reason not provided
    if (!remarks || remarks.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Rejection remarks are required.",
      });
    }

    batch.status = "REJECTED";

    batch.reviewedBy = req.user._id;
    batch.reviewedAt = new Date();

    batch.remarks = remarks;

    await batch.save();

    await createAuditLog({
      action: "BATCH_REJECTED",
      description: `Rejected batch ${batch.batchId}`,
      performedBy: req.user._id,
      role: req.user.role,
      batchId: batch._id,
      metadata: {
        remarks,
      },
      req,
    });
    return res.status(200).json({
      success: true,
      message: "Batch rejected successfully.",
      batch,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// to resubmit a rejected batch after fixing the issues
export const resubmitBatch = async (req, res) => {
  try {
    const { id } = req.params;

    const batch = await Batch.findById(id);

    if (!batch) {
      return res.status(404).json({
        success: false,
        message: "Batch not found",
      });
    }

    // Only rejected batches can be resubmitted
    if (batch.status !== "REJECTED") {
      return res.status(400).json({
        success: false,
        message: "Only rejected batches can be resubmitted.",
      });
    }

    batch.status = "SUBMITTED";

    batch.submittedBy = req.user._id;
    batch.submittedAt = new Date();

    // Reset previous review
    batch.reviewedBy = null;
    batch.reviewedAt = null;

    batch.approvedBy = null;
    batch.approvedAt = null;

    batch.remarks = "";

    await batch.save();

    await createAuditLog({
      action: "BATCH_RESUBMITTED",
      description: `Resubmitted batch ${batch.batchId}`,
      performedBy: req.user._id,
      role: req.user.role,
      batchId: batch._id,
      req,
    });

    return res.status(200).json({
      success: true,
      message: "Batch resubmitted successfully.",
      batch,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBatchStats = async (req, res) => {
  try {
    const { role, _id } = req.user;

    let query = {};

    switch (role) {
      case "ADMIN":
        query = {};
        break;

      case "MAKER":
        query = {
          createdBy: _id,
        };
        break;

      case "CHECKER":
        query = {
          status: {
            $in: ["SUBMITTED", "UNDER_REVIEW", "APPROVED", "REJECTED"],
          },
        };
        break;

      default:
        return res.status(403).json({
          success: false,
          message: "Unauthorized role",
        });
    }

    const [totalBatches, reconciledBatches, pendingBatches, batchesWithIssues] =
      await Promise.all([
        Batch.countDocuments(query),

        Batch.countDocuments({
          ...query,
          status: "RECONCILED",
        }),

        Batch.countDocuments({
          ...query,
          status: {
            $in: [
              "DRAFT",
              "PARTIAL_UPLOAD",
              "UPLOADED",
              "SUBMITTED",
              "UNDER_REVIEW",
            ],
          },
        }),

        Batch.countDocuments({
          ...query,
          $or: [
            { amountMismatchCount: { $gt: 0 } },
            { dateMismatchCount: { $gt: 0 } },
            { missingInBankCount: { $gt: 0 } },
            { missingInLedgerCount: { $gt: 0 } },
          ],
        }),
      ]);

    return res.status(200).json({
      success: true,
      role,
      stats: {
        totalBatches,
        reconciledBatches,
        pendingBatches,
        batchesWithIssues,
      },
    });
  } catch (error) {
    console.error("Failed to fetch batch stats:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
