import xlsx from "xlsx";

const isEmptyRow = (row) => {
  return Object.values(row).every(
    (value) =>
      value === null || value === undefined || String(value).trim() === "",
  );
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

  // 3. Find the first usable sheet
  let worksheet = null;
  let sheetName = null;

  for (const name of workbook.SheetNames) {
    const sheet = workbook.Sheets[name];

    if (!sheet) {
      continue;
    }

    const range = xlsx.utils.decode_range(sheet["!ref"] || "A1:A1");

    if (range.e.r >= range.s.r && range.e.c >= range.s.c) {
      worksheet = sheet;
      sheetName = name;
      break;
    }
  }

  if (!worksheet) {
    throw new Error("Excel workbook contains no usable worksheets.");
  }

  // 4. Extract rows
  let rows;

  try {
    rows = xlsx.utils.sheet_to_json(worksheet, {
      defval: "",
      raw: true,
      cellDates: true,
    });
  } catch (error) {
    throw new Error(
      `Unable to extract data from Excel worksheet "${sheetName}".`,
    );
  }

  if (!Array.isArray(rows)) {
    throw new Error("Unable to extract rows from Excel worksheet.");
  }

  // 5. Remove completely empty rows
  const nonEmptyRows = rows.filter((row) => !isEmptyRow(row));

  // 6. Return the same rows[] structure expected by validators
  return nonEmptyRows;
};

export default readExcelFile;
