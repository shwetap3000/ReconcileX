const validateBank = (rows) => {
  const fileErrors = [];
  const rowErrors = [];
  const warnings = [];

  // 1. Empty file validation
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

  // 2. Required columns
  const requiredColumns = [
    "Reference Number",
    "Transaction Date",
    "Amount",
    "Transaction Type",
  ];

  // 3. Check required columns
  const uploadedColumns = Object.keys(rows[0]);

  const missingColumns = requiredColumns.filter(
    (column) => !uploadedColumns.includes(column),
  );

  if (missingColumns.length > 0) {
    fileErrors.push(`Missing required columns: ${missingColumns.join(", ")}`);

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

  // 4. Validate every row
  rows.forEach((row, index) => {
    const currentRow = index + 2;
    const errors = [];

    if (!row["Reference Number"]) {
      errors.push("Reference Number is required");
    }

    if (!row["Transaction Date"]) {
      errors.push("Transaction Date is required");
    }

    if (
      row["Amount"] === undefined ||
      row["Amount"] === null ||
      row["Amount"] === ""
    ) {
      errors.push("Amount is required");
    }

    if (!row["Transaction Type"]) {
      errors.push("Transaction Type is required");
    }

    if (errors.length > 0) {
      rowErrors.push({
        row: currentRow,
        errors,
      });
    }
  });

  // 5. Count invalid rows
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

export default validateBank;
