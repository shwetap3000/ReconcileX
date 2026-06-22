import Counter from "../models/Counter.js";

const generateBatchId = async () => {
  const counter = await Counter.findOneAndUpdate(
    { name: "batchCounter" },
    { $inc: { value: 1 } },
    {
      new: true,
      upsert: true,
    },
  );

  const sequenceNumber = counter.value.toString().padStart(4, "0");

  const today = new Date();

  const datePart =
    today.getFullYear().toString() +
    String(today.getMonth() + 1).padStart(2, "0") +
    String(today.getDate()).padStart(2, "0");

  return `BATCH-${datePart}-${sequenceNumber}`;
};

export default generateBatchId;
