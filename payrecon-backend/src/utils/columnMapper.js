const normalizeHeader = (header) => {
  return String(header).trim().toLowerCase().replace(/\s+/g, " ");
};

export const mapColumns = (rows, columnMappings) => {
  if (!rows || rows.length === 0) {
    return {
      rows: [],
      errors: [],
    };
  }

  const uploadedColumns = Object.keys(rows[0]);

  const normalizedUploadedColumns = new Map(
    uploadedColumns.map((column) => [normalizeHeader(column), column]),
  );

  const errors = [];
  const resolvedMappings = {};

  for (const [canonicalColumn, allowedColumns] of Object.entries(
    columnMappings,
  )) {
    const candidates = [canonicalColumn, ...allowedColumns];

    const matchedColumn = candidates.find((candidate) =>
      normalizedUploadedColumns.has(normalizeHeader(candidate)),
    );

    if (!matchedColumn) {
      errors.push(
        `Unable to map column "${canonicalColumn}". Expected one of: ${candidates.join(
          ", ",
        )}`,
      );

      continue;
    }

    resolvedMappings[canonicalColumn] = normalizedUploadedColumns.get(
      normalizeHeader(matchedColumn),
    );
  }

  if (errors.length > 0) {
    return {
      rows: [],
      errors,
    };
  }

  const mappedRows = rows.map((row) => {
    const mappedRow = {};

    for (const [canonicalColumn, uploadedColumn] of Object.entries(
      resolvedMappings,
    )) {
      mappedRow[canonicalColumn] = row[uploadedColumn];
    }

    return mappedRow;
  });

  return {
    rows: mappedRows,
    errors: [],
  };
};
