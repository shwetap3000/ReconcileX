import { mapColumns } from "../utils/columnMapper.js";

const validateLedger = (rows) => {
  // Arrays to store validation results
  const fileErrors = [];
  const rowErrors = [];
  const warnings = [];

  // 1. Check if file is empty
  if (!rows || rows.length === 0) {
    fileErrors.push("Uploaded Excel file is empty.");

    return {
      isValid: false,
      totalRows: 0,
      validRows: 0,
      invalidRows: 0,
      fileErrors,
      rowErrors,
      warnings,
    };
  }

  // 2. Column mapping
  const columnMappings = {
    "Transaction ID": ["Txn ID", "Transaction No"],
    "Reference Number": ["Reference No", "Ref No"],
    "Transaction Date": ["Date", "Txn Date"],
    Amount: ["Transaction Amount", "Txn Amount"],
  };

  const mappingResult = mapColumns(rows, columnMappings);

  // 3. Handle column mapping errors
  if (mappingResult.errors.length > 0) {
    fileErrors.push(...mappingResult.errors);

    return {
      isValid: false,
      totalRows: rows.length,
      validRows: 0,
      invalidRows: rows.length,
      fileErrors,
      rowErrors,
      warnings,
    };
  }

  // Replace original rows with normalized/mapped rows
  rows = mappingResult.rows;

  // 4. Validate every row
  rows.forEach((row, index) => {
    const currentRow = index + 2;

    // Transaction ID

    if (
      row["Transaction ID"] === undefined ||
      row["Transaction ID"] === null ||
      String(row["Transaction ID"]).trim() === ""
    ) {
      rowErrors.push({
        row: currentRow,
        field: "Transaction ID",
        message: "Transaction ID is required",
      });
    } else if (typeof row["Transaction ID"] !== "string") {
      rowErrors.push({
        row: currentRow,
        field: "Transaction ID",
        message: "Transaction ID must be a string",
      });
    }

    // Reference Number

    if (
      row["Reference Number"] === undefined ||
      row["Reference Number"] === null ||
      String(row["Reference Number"]).trim() === ""
    ) {
      rowErrors.push({
        row: currentRow,
        field: "Reference Number",
        message: "Reference Number is required",
      });
    } else if (typeof row["Reference Number"] !== "string") {
      rowErrors.push({
        row: currentRow,
        field: "Reference Number",
        message: "Reference Number must be a string",
      });
    }

    // Transaction Date

    if (
      row["Transaction Date"] === undefined ||
      row["Transaction Date"] === null ||
      String(row["Transaction Date"]).trim() === ""
    ) {
      rowErrors.push({
        row: currentRow,
        field: "Transaction Date",
        message: "Transaction Date is required",
      });
    } else {
      const date = row["Transaction Date"];

      const isValidDate =
        date instanceof Date
          ? !Number.isNaN(date.getTime())
          : !Number.isNaN(new Date(date).getTime());

      if (!isValidDate) {
        rowErrors.push({
          row: currentRow,
          field: "Transaction Date",
          message: "Transaction Date must be a valid date",
        });
      }
    }

    // Amount

    if (
      row["Amount"] === undefined ||
      row["Amount"] === null ||
      String(row["Amount"]).trim() === ""
    ) {
      rowErrors.push({
        row: currentRow,
        field: "Amount",
        message: "Amount is required",
      });
    } else {
      const amount = row["Amount"];

      const isValidAmount =
        typeof amount === "number"
          ? Number.isFinite(amount)
          : typeof amount === "string" &&
            amount.trim() !== "" &&
            Number.isFinite(Number(amount));

      if (!isValidAmount) {
        rowErrors.push({
          row: currentRow,
          field: "Amount",
          message: "Amount must be a valid number",
        });
      }
    }
  });

  // 5. Count unique invalid rows
  const invalidRowNumbers = new Set(rowErrors.map((error) => error.row));

  const invalidRows = invalidRowNumbers.size;
  const validRows = rows.length - invalidRows;

  // 6. Return validation result
  return {
    isValid: fileErrors.length === 0 && rowErrors.length === 0,
    totalRows: rows.length,
    validRows,
    invalidRows,
    fileErrors,
    rowErrors,
    warnings,
  };
};

export default validateLedger;
