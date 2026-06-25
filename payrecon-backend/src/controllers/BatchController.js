import mongoose from "mongoose";
import Batch from "../models/Batch.js";
import generateBatchId from "../utils/generateBatchId.js";
import BatchFile from "../models/BatchFile.js";

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