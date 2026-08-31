const validateBank = (rows) => {
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

    // Reference Number
    if (!row["Reference Number"]) {
      rowErrors.push({
        row: currentRow,
        field: "Reference Number",
        message: "Reference Number is required",
      });
    }

    // Transaction Date
    if (!row["Transaction Date"]) {
      rowErrors.push({
        row: currentRow,
        field: "Transaction Date",
        message: "Transaction Date is required",
      });
    } else if (
      !(row["Transaction Date"] instanceof Date) &&
      isNaN(new Date(row["Transaction Date"]).getTime())
    ) {
      rowErrors.push({
        row: currentRow,
        field: "Transaction Date",
        message: "Transaction Date must be a valid date",
      });
    }

    // Amount
    if (
      row["Amount"] === undefined ||
      row["Amount"] === null ||
      row["Amount"] === ""
    ) {
      rowErrors.push({
        row: currentRow,
        field: "Amount",
        message: "Amount is required",
      });
    } else if (isNaN(Number(row["Amount"]))) {
      rowErrors.push({
        row: currentRow,
        field: "Amount",
        message: "Amount must be a valid number",
      });
    }

    // Transaction Type
    if (!row["Transaction Type"]) {
      rowErrors.push({
        row: currentRow,
        field: "Transaction Type",
        message: "Transaction Type is required",
      });
    } else if (
      !["DEBIT", "CREDIT"].includes(
        String(row["Transaction Type"]).trim().toUpperCase(),
      )
    ) {
      rowErrors.push({
        row: currentRow,
        field: "Transaction Type",
        message: "Transaction Type must be DEBIT or CREDIT",
      });
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

export default validateBank;
