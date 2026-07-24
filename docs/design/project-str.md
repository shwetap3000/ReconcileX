It’s a full-stack payment reconciliation and audit-trail system built using the MERN ecosystem, with JWT authentication, RBAC, Excel-based data ingestion, transaction matching/reconciliation logic, maker-checker workflows, REST APIs, audit logging, analytics, and reporting.

Base technology is approximately React + Node.js + Express.js + MongoDB. But on top of that, the architecture includes:

Authentication & security — password hashing with bcrypt, JWT-based authentication, protected APIs.
RBAC (Role-Based Access Control) — Maker, Checker, and Admin have different permissions.
Excel/file processing — uploading ledger and bank Excel files, parsing them, validating rows, and storing file metadata.
Data engineering / ingestion pipeline — Upload → Parse → Validate → Transform/Store → Reconcile.
Reconciliation engine — actual business logic that compares ledger transactions against bank transactions using reference number, amount, and date.
Exception classification — MATCHED, MISSING_IN_BANK, MISSING_IN_LEDGER, AMOUNT_MISMATCH, DATE_MISMATCH, etc.
Maker–Checker workflow — one user prepares/submits reconciliation results while another reviews and approves/rejects them. This is a real enterprise workflow pattern.
Batch processing — each reconciliation operates as a batch/job with its own ID and lifecycle such as Draft → Uploaded → Submitted → Under Review → Approved/Rejected → Reconciled.
REST API architecture — separate summary and batch-detail APIs for frontend/backend communication.
Audit trail — tracking who performed an action, what happened, when it happened, batch involved, old/new values, and reasons.
Analytics & reporting — totals, matched percentage, mismatch counts, reconciliation summaries, dashboards, reports, and exports.
Database/system design — multiple MongoDB collections with relationships between Users, Batches, BatchFiles, Ledger Transactions, Bank Transactions, and Audit Logs.