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

    const totalBatches = await Batch.countDocuments();

    const batches = await Batch.find()
      .select("batchId batchName status createdByName createdAt")
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: batches.length,
      page,
      totalPages: Math.ceil(totalBatches / limit),
      batches,
    });
  } catch (error) {
    res.status(500).json({
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

    // Prevent duplicate ledger uploads
    const existingTransactions = await LedgerTransaction.countDocuments({
      batchId: batch._id,
    });

    if (existingTransactions > 0) {
      return res.status(400).json({
        success: false,
        message: "Ledger file has already been uploaded for this batch.",
      });
    }

    // Save uploaded file details
    const batchFile = await BatchFile.create({
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
    });

    // Read Excel
    const rows = readExcelFile(req.file.path);

    // Validate Excel
    const validation = validateLedger(rows);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        fileErrors: validation.fileErrors,
        rowErrors: validation.rowErrors,
        warnings: validation.warnings,
      });
    }

    // Convert Excel rows into LedgerTransaction documents
    const ledgerTransactions = rows.map((row) => ({
      batchId: batch._id,

      transactionId: row["Transaction ID"],

      referenceNumber: row["Reference Number"],

      transactionDate: new Date(row["Transaction Date"]),

      amount: Number(row["Amount"]),

      status: "PENDING",
    }));

    // Bulk insert transactions
    await LedgerTransaction.insertMany(ledgerTransactions);

    // Update batch
    batch.files.push(batchFile._id);
    batch.totalLedgerTransactions = ledgerTransactions.length;
    batch.status = "PARTIAL_UPLOAD";

    await batch.save();

    // Delete local uploaded file
    fs.unlinkSync(req.file.path);

    return res.status(200).json({
      success: true,
      message: "Ledger uploaded successfully",
      totalTransactions: ledgerTransactions.length,
      batch,
      batchFile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// to upload a bank file to a specific batch
export const uploadBankFile = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Batch ID",
      });
    }

    const batch = await Batch.findById(req.params.id);

    if (!batch) {
      return res.status(404).json({
        success: false,
        message: "Batch not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const existingTransactions = await BankTransaction.countDocuments({
      batchId: batch._id,
    });

    if (existingTransactions > 0) {
      return res.status(400).json({
        success: false,
        message: "Bank file has already been uploaded for this batch.",
      });
    }

    const batchFile = await BatchFile.create({
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
    });

    const rows = readExcelFile(req.file.path);

    const validation = validateBank(rows);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        fileErrors: validation.fileErrors,
        rowErrors: validation.rowErrors,
        warnings: validation.warnings,
      });
    }

    const bankTransactions = rows.map((row) => ({
      batchId: batch._id,

      referenceNumber: row["Reference Number"],
      transactionDate: new Date(row["Transaction Date"]),
      amount: Number(row["Amount"]),
      transactionType: row["Transaction Type"],

      status: "PENDING",
    }));

    await BankTransaction.insertMany(bankTransactions);

    batch.files.push(batchFile._id);

    batch.totalBankTransactions = bankTransactions.length;

    if (batch.totalLedgerTransactions > 0) {
      batch.status = "UPLOADED";
    } else {
      batch.status = "PARTIAL_UPLOAD";
    }

    await batch.save();

    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(200).json({
      success: true,
      message: "Bank uploaded successfully",
      totalTransactions: bankTransactions.length,
      batch,
      batchFile,
    });
  } catch (error) {
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

    const result = await reconcileTransactions(batchId);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
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

    // Total reconciled transactions
    const totalReconciled =
      batch.matchedTransactions +
      batch.amountMismatchCount +
      batch.dateMismatchCount +
      batch.missingInBankCount +
      batch.missingInLedgerCount;

    // Calculate match percentage
    const matchPercentage =
      totalReconciled === 0
        ? 0
        : Number(
            ((batch.matchedTransactions / totalReconciled) * 100).toFixed(2),
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

        totalReconciled,
        matchPercentage,
      },
    });
  } catch (error) {
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