const validateLedger = (rows) => {
  // Arrays to store validation results
  const fileErrors = [];
  const rowErrors = [];
  const warnings = [];

  // Check if file is empty
  if (!rows || rows.length === 0) {
    fileErrors.push("Uploaded Excel file is empty.");
  }

  // Required columns
  const requiredColumns = [
    "Transaction ID",
    "Reference Number",
    "Transaction Date",
    "Amount",
  ];

  // Check if required columns exist
  if (rows.length > 0) {
    const uploadedColumns = Object.keys(rows[0]);

    const missingColumns = requiredColumns.filter(
      (column) => !uploadedColumns.includes(column)
    );

    if (missingColumns.length > 0) {
      fileErrors.push(
        `Missing required columns: ${missingColumns.join(", ")}`
      );
    }
  }

  // Stop here if file-level validation already failed
  if (fileErrors.length > 0) {
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

  // Validate every row
  rows.forEach((row, index) => {
    // Transaction ID
    if (!row["Transaction ID"]) {
      rowErrors.push({
        row: index + 2,
        field: "Transaction ID",
        message: "Transaction ID is required",
      });
    }

    // Reference Number
    if (!row["Reference Number"]) {
      rowErrors.push({
        row: index + 2,
        field: "Reference Number",
        message: "Reference Number is required",
      });
    }

    // Transaction Date
    if (!row["Transaction Date"]) {
      rowErrors.push({
        row: index + 2,
        field: "Transaction Date",
        message: "Transaction Date is required",
      });
    }

    // Amount
    if (
      row["Amount"] === undefined ||
      row["Amount"] === null ||
      row["Amount"] === ""
    ) {
      rowErrors.push({
        row: index + 2,
        field: "Amount",
        message: "Amount is required",
      });
    }
  });

  // Count unique invalid rows
  const invalidRowNumbers = new Set(
    rowErrors.map((error) => error.row)
  );

  // Return validation result
  return {
    isValid:
      fileErrors.length === 0 &&
      rowErrors.length === 0,

    totalRows: rows.length,

    validRows:
      rows.length - invalidRowNumbers.size,

    invalidRows:
      invalidRowNumbers.size,

    fileErrors,
    rowErrors,
    warnings,
  };
};

export default validateLedger;