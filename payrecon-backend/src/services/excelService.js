import xlsx from "xlsx";

const isEmptyRow = (row) => {
  return Object.values(row).every(
    (value) =>
      value === null || value === undefined || String(value).trim() === "",
  );
};

const extractRows = (worksheet) => {
  return xlsx.utils.sheet_to_json(worksheet, {
    defval: "",
    raw: true,
    cellDates: true,
  });
};

export const readExcelFile = (filePath) => {
  let workbook;

  // 1. Read workbook
  try {
    workbook = xlsx.readFile(filePath, {
      cellDates: true,
    });
  } catch (error) {
    throw new Error(
      "Unable to read Excel file. The file may be corrupted or malformed.",
    );
  }

  // 2. Validate workbook
  if (!workbook || !Array.isArray(workbook.SheetNames)) {
    throw new Error("Invalid Excel workbook.");
  }

  if (workbook.SheetNames.length === 0) {
    throw new Error("Excel workbook contains no sheets.");
  }

  // 3. Find the first sheet that actually contains data
  let selectedRows = null;

  for (const sheetName of workbook.SheetNames) {
    const worksheet = workbook.Sheets[sheetName];

    if (!worksheet) {
      continue;
    }

    let rows;

    try {
      rows = extractRows(worksheet);
    } catch (error) {
      throw new Error(
        `Unable to extract data from Excel worksheet "${sheetName}".`,
      );
    }

    if (!Array.isArray(rows)) {
      continue;
    }

    // Remove completely empty rows
    const nonEmptyRows = rows.filter((row) => !isEmptyRow(row));

    // Only consider this sheet usable if it actually contains data
    if (nonEmptyRows.length > 0) {
      selectedRows = nonEmptyRows;
      break;
    }
  }

  // 4. No sheet contained any data
  if (!selectedRows) {
    return [];
  }

  // 5. Return the same rows[] structure expected by validators
  return selectedRows;
};

export default readExcelFile;
