const validateBank = (rows) => {
  const fileErrors = [];
  const rowErrors = [];
  const warnings = [];

  // Empty file validation
  if (!rows || rows.length === 0) {
    fileErrors.push("Uploaded Excel file is empty.");
  }

  const requiredColumns = [
    "Reference Number",
    "Transaction Date",
    "Amount",
    "Transaction Type",
  ];

  // Check required columns
  if (rows.length > 0) {
    const uploadedColumns = Object.keys(rows[0]);

    const missingColumns = requiredColumns.filter(
      (column) => !uploadedColumns.includes(column),
    );

    if (missingColumns.length > 0) {
      fileErrors.push(`Missing required columns: ${missingColumns.join(", ")}`);
    }
  }

  // Validate every row
  rows.forEach((row, index) => {
    const currentRow = index + 2;

    const errors = [];

    if (!row["Transaction Type"]) {
      errors.push("Transaction ID is missing");
    }

    if (!row["Reference Number"]) {
      errors.push("Reference Number is missing");
    }

    if (!row["Transaction Date"]) {
      errors.push("Transaction Date is missing");
    }

    if (
      row["Amount"] === undefined ||
      row["Amount"] === null ||
      row["Amount"] === ""
    ) {
      errors.push("Amount is missing");
    }

    if (errors.length > 0) {
      rowErrors.push({
        row: currentRow,
        errors,
      });
    }
  });

  return {
    isValid: fileErrors.length === 0 && rowErrors.length === 0,
    totalRows: rows.length,
    validRows: rows.length - rowErrors.length,
    invalidRows: rowErrors.length,
    fileErrors,
    rowErrors,
    warnings,
  };
};

export default validateBank;
