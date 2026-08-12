# Payment Reconciliation Engine — Complete Design & Explanation

# 1. What is a Reconciliation Engine?

A **Reconciliation Engine** is the component responsible for automatically comparing two independent sources of financial transaction data and determining whether they agree.

In our system, the two sources are:

* **Ledger transactions** — the company's internal record of transactions.
* **Bank transactions** — transactions recorded by the bank.

Ideally, a transaction recorded in the company's ledger should also appear in the bank statement with the same relevant information. However, differences can occur because of incorrect amounts, date differences, missing transactions, duplicate records, bank charges, delays, or other business situations.

The reconciliation engine takes these two datasets and answers questions such as:

> Does this ledger transaction have a corresponding bank transaction?

> If it does, does the amount match?

> Does the date match according to the configured rules?

> If there is no corresponding transaction, is it missing from the bank or missing from the ledger?

Therefore, the engine does not simply compare two Excel files. **It converts raw transaction data into meaningful financial reconciliation decisions.**

---

# 2. Where does the Reconciliation Engine fit into our system?

The complete flow is:

```text
User Authentication
       ↓
Create Batch
       ↓
Upload Ledger + Bank Files
       ↓
Parse Excel Files
       ↓
Validate Data
       ↓
Normalize Transactions
       ↓
Store Transactions in MongoDB
       ↓
Configure Reconciliation Rules
       ↓
        ┌──────────────────────┐
        │ RECONCILIATION ENGINE│
        └──────────┬───────────┘
                   ↓
        Match & Classify
                   ↓
        Store Reconciliation Results
                   ↓
        Calculate Batch Summary
                   ↓
        Maker Reviews Results
                   ↓
        Submit Batch
                   ↓
        Checker Reviews
                   ↓
        Approve / Reject
                   ↓
        Audit Trail
```

The important point is that **the reconciliation engine should not be responsible for parsing Excel files**.

Excel parsing belongs to the **data-ingestion layer**.

The reconciliation engine should receive already validated and normalized transaction records.

So we maintain this separation:

```text
Excel
  ↓
Parser
  ↓
Validator
  ↓
Normalizer
  ↓
MongoDB
  ↓
Reconciliation Engine
```

This separation makes the architecture cleaner and makes the engine easier to test.

---

# 3. What exactly will the engine receive?

The engine will primarily receive three things:

### 1. Ledger transactions

For example:

```text
Reference     Amount     Date
TXN001        1000       2026-08-10
TXN002        2500       2026-08-10
TXN003        5000       2026-08-11
```

### 2. Bank transactions

```text
Reference     Amount     Date
TXN001        1000       2026-08-10
TXN002        2200       2026-08-10
TXN003        5000       2026-08-12
TXN005        900        2026-08-11
```

### 3. Reconciliation configuration

This is the new and important part of our design.

Instead of permanently hard-coding the matching rules, the engine receives a **Reconciliation Configuration**.

Conceptually:

```javascript
{
    matchFields: [
        "reference",
        "amount",
        "date"
    ],

    amountTolerance: 0,

    dateToleranceDays: 0
}
```

So the engine becomes conceptually:

```text
Ledger Transactions
        +
Bank Transactions
        +
Reconciliation Configuration
        ↓
Reconciliation Engine
        ↓
Reconciliation Results
        +
Summary
```

---

# 4. Why should the reconciliation rules be configurable?

This is one of the strongest design decisions in our project.

Different businesses or reconciliation processes may have different matching requirements. One process may require the reference number, amount, and date to match exactly. Another process may allow a one-day date difference because the bank transaction may appear one day later. Another may allow a small amount difference because of fees or rounding.

Therefore, instead of building an engine that says:

> "Every transaction must always match using reference + amount + date."

we build an engine that says:

> "Give me the reconciliation rules, and I will apply those rules consistently."

This is called **configurable reconciliation**.

It separates the **matching engine** from the **business rules**.

---

# 5. Two reconciliation modes

Our system will support two modes.

## Mode 1 — Standard Reconciliation

The system provides a predefined configuration.

For example:

```text
Primary Match:
Reference Number

Verification:
Amount
Date

Amount Tolerance:
₹0

Date Tolerance:
0 days
```

The user can simply select:

```text
Run Standard Reconciliation
```

The engine automatically uses the predefined rules.

This makes the system easy to use when the organization follows its normal reconciliation process.

---

# 6. Mode 2 — Custom Reconciliation

The Maker can configure the reconciliation rules before running the engine.

For example:

```text
Primary Matching Field:
Reference Number

Additional Matching Fields:
✓ Amount
✓ Date

Amount Tolerance:
₹10

Date Tolerance:
1 day
```

The resulting configuration might look conceptually like:

```javascript
{
    matchFields: [
        "reference",
        "amount",
        "date"
    ],

    amountTolerance: 10,

    dateToleranceDays: 1
}
```

The engine then uses this configuration instead of the default rules.

This means the user is not changing the actual algorithm. **They are configuring the rules that the algorithm applies.**

That distinction is important when explaining the project.

---

# 7. Matching criteria

Our engine can conceptually work with different transaction fields.

Possible fields include:

* Reference number
* UTR / transaction reference
* Transaction ID
* Amount
* Transaction date
* Currency
* Transaction type

However, we should not implement every possible field immediately.

For our first version, I recommend:

```text
Reference Number
Amount
Date
```

These are sufficient to demonstrate a meaningful reconciliation engine.

Later, we can extend the configuration system to support additional fields.

---

# 8. Primary matching key

The engine needs a way to **find a candidate transaction**.

For our first implementation, the primary matching key will be the **reference number**.

For example:

```text
Ledger:

TXN001 → ₹1000 → 10 Aug
```

The engine looks for:

```text
Bank:

TXN001 → ?
```

Once it finds the candidate, it compares the other configured fields.

This is better than comparing every ledger transaction with every bank transaction.

---

# 9. Why we should not compare every transaction with every other transaction

Suppose we have:

```text
100,000 Ledger transactions
100,000 Bank transactions
```

A naive algorithm could do:

```text
For every Ledger transaction
    Compare with every Bank transaction
```

That can result in approximately:

```text
100,000 × 100,000
= 10,000,000,000 comparisons
```

This is an **O(N × M)** approach.

It becomes inefficient as the transaction volume increases.

Your project documentation specifically recommends using a lookup structure or appropriate database indexes to avoid this type of repeated full searching. 

---

# 10. Efficient matching using a lookup map

Instead, we will prepare the bank transactions into a lookup structure.

Conceptually:

```text
Bank Transactions
       ↓
   Hash Map
       ↓

TXN001 → Bank Transaction
TXN002 → Bank Transaction
TXN003 → Bank Transaction
TXN005 → Bank Transaction
```

Then when processing:

```text
Ledger TXN002
```

we can directly do:

```text
bankMap["TXN002"]
```

instead of searching the entire bank dataset.

This gives us approximately:

```text
O(N + M)
```

rather than:

```text
O(N × M)
```

where `N` is the number of ledger transactions and `M` is the number of bank transactions.

This is an important technical point you can mention in interviews.

---

# 11. Handling duplicate references

There is one important problem with a simple map.

Suppose the bank contains:

```text
TXN001 → ₹1000
TXN001 → ₹500
```

If we simply do:

```javascript
bankMap.set("TXN001", transaction)
```

one transaction could overwrite the other.

Therefore, our design should support:

```text
Reference
    ↓
Multiple candidate transactions
```

Conceptually:

```javascript
{
    "TXN001": [
        bankTransaction1,
        bankTransaction2
    ]
}
```

This allows the reconciliation engine to deal with duplicate references rather than silently losing information.

Duplicate references are also one of the real-world complications identified in your project understanding. 

---

# 12. Data normalization before reconciliation

The reconciliation engine should not directly work with messy Excel values.

For example, the same reference could appear as:

```text
"TXN001"
" txn001 "
"Txn001"
```

Dates could appear as:

```text
10/08/2026
2026-08-10
10-Aug-2026
```

Amounts could appear as:

```text
1000
1,000
₹1,000
1000.00
```

Therefore, before reconciliation, the ingestion pipeline should normalize them.

For example:

```javascript
{
    reference: "TXN001",
    amount: 1000,
    date: "2026-08-10"
}
```

The engine should then work with these normalized values.

This prevents formatting differences from being incorrectly classified as business mismatches.

---

# 13. The actual matching process

Once the data is prepared, the engine processes each Ledger transaction.

The basic decision flow is:

```text
Ledger Transaction
        ↓
Find Bank Candidate Using Matching Key
        ↓
      Found?
     /      \
   NO        YES
   ↓          ↓
Missing      Compare
in Bank      configured fields
              ↓
        Classify Result
```

The classification rules are the heart of the engine.

---

# 14. Case 1 — Missing in Bank

Suppose:

```text
Ledger:

TXN004
₹800
11 Aug
```

But there is no `TXN004` in the bank data.

Then:

```text
MISSING_IN_BANK
```

The meaning is:

> The transaction exists in the company's ledger but no corresponding transaction was found in the bank statement.

---

# 15. Case 2 — Amount mismatch

Suppose:

```text
Ledger:

TXN002
₹2500
10 Aug
```

Bank:

```text
TXN002
₹2200
10 Aug
```

The reference matches.

The date matches.

But the amount differs.

Therefore:

```text
AMOUNT_MISMATCH
```

We can also calculate:

```text
Difference = Ledger Amount - Bank Amount

= ₹2500 - ₹2200
= ₹300
```

This difference can be stored in the reconciliation result.

---

# 16. Case 3 — Date mismatch

Suppose:

```text
Ledger:

TXN003
₹5000
10 Aug
```

Bank:

```text
TXN003
₹5000
12 Aug
```

Reference matches.

Amount matches.

Date differs.

Under strict rules:

```text
DATE_MISMATCH
```

However, if the configuration says:

```text
Date tolerance = 2 days
```

then:

```text
|12 Aug - 10 Aug| = 2 days
```

and the transaction may qualify as a match according to the configured business rule.

This is exactly why configurable rules are useful.

---

# 17. Case 4 — Fully matched

Suppose:

```text
Ledger:
TXN001
₹1000
10 Aug

Bank:
TXN001
₹1000
10 Aug
```

Everything matches.

Therefore:

```text
MATCHED
```

---

# 18. Case 5 — Missing in Ledger

There is another case that cannot be discovered by processing only the Ledger.

Suppose:

```text
Ledger:
TXN001
TXN002
TXN003
```

Bank:

```text
TXN001
TXN002
TXN003
TXN005
```

`TXN005` exists only in the bank.

Therefore:

```text
MISSING_IN_LEDGER
```

To detect this, after processing all Ledger transactions, we need to identify **bank transactions that were never matched**.

---

# 19. Tracking matched bank transactions

We can maintain a collection such as:

```text
matchedBankTransactions
```

Whenever a bank transaction is successfully considered for a Ledger transaction, we mark it as processed/matched.

At the end:

```text
All Bank Transactions
        -
Matched Bank Transactions
        ↓
Unmatched Bank Transactions
        ↓
MISSING_IN_LEDGER
```

This gives us complete two-sided reconciliation.

---

# 20. Reconciliation statuses

Our initial status model should be:

```text
MATCHED
AMOUNT_MISMATCH
DATE_MISMATCH
MISSING_IN_BANK
MISSING_IN_LEDGER
```

We can later add:

```text
MATCHED_WITH_TOLERANCE
DUPLICATE
MULTIPLE_CANDIDATES
```

But I recommend keeping the first version focused.

The original project design already establishes the core categories of matched, amount mismatch, date mismatch, missing in bank, and missing in ledger. 

---

# 21. Why should we add `MATCHED_WITH_TOLERANCE`?

Suppose the user configures:

```text
Amount tolerance = ₹10
```

and:

```text
Ledger = ₹1000
Bank = ₹995
```

The difference is:

```text
₹5
```

Since:

```text
₹5 <= ₹10
```

the transaction may be considered acceptable according to the configured rule.

Instead of hiding this information under ordinary `MATCHED`, I recommend having:

```text
MATCHED_WITH_TOLERANCE
```

This allows the dashboard to distinguish:

```text
Exact Matches
vs
Matches accepted because of tolerance
```

That is more transparent.

---

# 22. AND vs OR matching

This is an important rule we need to define.

If the configuration says:

```text
Reference
Amount
Date
```

we should normally interpret this as:

```text
Reference matches
       AND
Amount matches
       AND
Date matches
```

not:

```text
Reference matches
       OR
Amount matches
       OR
Date matches
```

For financial reconciliation, an OR-based approach could produce incorrect matches.

So our initial engine will use **AND semantics for configured verification criteria**.

---

# 23. Primary key vs verification fields

We should conceptually separate:

### Candidate identification

Used to **find the possible corresponding transaction**.

Example:

```text
Reference Number
```

### Verification criteria

Used to **determine whether the candidate actually matches**.

Example:

```text
Amount
Date
```

So:

```text
Reference
   ↓
Find candidate
   ↓
Compare Amount
   ↓
Compare Date
   ↓
Classify
```

This distinction makes our engine architecture much clearer.

---

# 24. Reconciliation Configuration

The configuration is essentially the **rule set provided to the engine**.

A conceptual configuration could be:

```javascript
{
    mode: "CUSTOM",

    primaryMatchField: "reference",

    verificationFields: [
        "amount",
        "date"
    ],

    amountTolerance: 0,

    dateToleranceDays: 0
}
```

For standard reconciliation:

```javascript
{
    mode: "STANDARD",

    primaryMatchField: "reference",

    verificationFields: [
        "amount",
        "date"
    ],

    amountTolerance: 0,

    dateToleranceDays: 0
}
```

The exact MongoDB schema can be finalized when we inspect your existing backend models.

---

# 25. Why should configuration be stored with the Batch?

This is particularly important because your system has an **audit trail**.

Suppose:

```text
Batch B001
```

was reconciled using:

```text
Reference + Amount + Date
Amount tolerance = ₹10
Date tolerance = 1 day
```

Six months later, an auditor opens the batch.

They should be able to answer:

> "What rules were used when this reconciliation was performed?"

Therefore, the batch should preserve the reconciliation configuration that was used.

Conceptually:

```text
Batch
 ├── Files
 ├── Transactions
 ├── Reconciliation Configuration
 ├── Reconciliation Results
 ├── Summary
 └── Audit History
```

This makes the process **reproducible and traceable**.

---

# 26. Configuration changes must invalidate previous results

Suppose the Maker runs:

```text
Configuration A
Reference + Amount + Date
```

and gets:

```text
10,000 transactions reconciled
```

Then the Maker changes the configuration to:

```text
Configuration B
Reference + Amount
Date tolerance = 2 days
```

The old results are no longer necessarily valid.

Therefore:

```text
Configuration changed
        ↓
Previous reconciliation becomes stale
        ↓
Reconciliation must run again
```

This is an important business rule.

We should not allow a batch to contain results that were calculated using one configuration while claiming that another configuration is currently active.

---

# 27. Reconciliation should be controlled by batch state

The engine should not simply run whenever someone calls the API.

It should first check the batch state.

For example:

```text
DRAFT
   ↓
UPLOAD FILES
   ↓
UPLOADED
   ↓
RUN RECONCILIATION
   ↓
RECONCILED / READY_FOR_REVIEW
   ↓
SUBMITTED
   ↓
UNDER_REVIEW
   ↓
APPROVED / REJECTED
```

Your project already defines a batch lifecycle and emphasizes that the backend should control valid state transitions. 

For example, we should not allow:

```text
DRAFT → APPROVED
```

without the required processing and review stages.

---

# 28. What should the engine produce?

The engine should produce **two major outputs**.

## A. Transaction-level results

For every reconciliation decision:

```text
Ledger Transaction
Bank Transaction
Status
Differences
Reason
```

For example:

```javascript
{
    batchId: "BATCH001",

    ledgerTransactionId: "...",
    bankTransactionId: "...",

    reference: "TXN002",

    ledgerAmount: 2500,
    bankAmount: 2200,

    ledgerDate: "2026-08-10",
    bankDate: "2026-08-10",

    status: "AMOUNT_MISMATCH",

    differenceAmount: 300,

    differenceDays: 0,

    reason: "Reference matched but amount differs"
}
```

---

# 29. Why do we need detailed results?

Because the dashboard might show:

```text
9,200 Matched
300 Amount Mismatch
100 Date Mismatch
250 Missing in Bank
150 Missing in Ledger
```

But if the user clicks:

```text
Amount Mismatch
```

they need to see the actual transactions.

Therefore:

```text
Summary
   ↓
User selects exception
   ↓
Detailed transaction results
```

This is why your architecture separates the **Reconciliation Summary API** and **Batch Details API**. 

---

# 30. Batch-level summary

After all individual transactions have been classified, we aggregate the results.

For example:

```javascript
{
    totalLedger: 10000,
    totalBank: 9950,

    matched: 9200,

    amountMismatch: 300,
    dateMismatch: 100,

    missingInBank: 250,
    missingInLedger: 150
}
```

We can also calculate:

```text
Match Percentage
```

For example:

```text
matched / total relevant transactions × 100
```

The exact denominator should be explicitly defined in our implementation rather than assumed.

Your project architecture already identifies these batch-level counters and match percentage as part of the analytics layer. 

---

# 31. Reconciliation API

The engine can eventually be exposed through an endpoint such as:

```http
POST /api/reconciliation/:batchId/run
```

The frontend might send the selected configuration:

```json
{
    "mode": "CUSTOM",
    "primaryMatchField": "reference",
    "verificationFields": [
        "amount",
        "date"
    ],
    "amountTolerance": 10,
    "dateToleranceDays": 1
}
```

The backend then:

```text
Authenticate user
       ↓
Check RBAC
       ↓
Find batch
       ↓
Validate batch state
       ↓
Validate configuration
       ↓
Fetch transactions
       ↓
Run reconciliation engine
       ↓
Store results
       ↓
Calculate summary
       ↓
Create audit record
       ↓
Return response
```

React never directly interacts with MongoDB. Your backend handles the business logic and database interaction. 

---

# 32. Separation of responsibilities

We should keep the system modular.

Conceptually:

```text
Controller
    ↓
Service
    ↓
Reconciliation Engine
    ↓
Repository / Model
```

### Controller

Handles the HTTP request and response.

### Service

Handles orchestration:

```text
Get batch
Get transactions
Validate
Call engine
Save results
Create audit record
```

### Engine

Handles the **actual reconciliation algorithm**.

### Model / Repository

Handles MongoDB operations.

This means the engine itself doesn't need to know about HTTP requests or Express.

That makes it independently testable.

---

# 33. The engine itself should ideally be a pure business-logic component

Conceptually:

```javascript
reconcile(
    ledgerTransactions,
    bankTransactions,
    reconciliationConfig
)
```

and it returns:

```javascript
{
    results: [...],
    summary: {...}
}
```

It shouldn't need to know:

```text
Express
HTTP
React
JWT
MongoDB connection
```

Its responsibility should simply be:

> Given two normalized transaction datasets and a rule configuration, determine their reconciliation results.

This is a strong software-engineering design because the business logic is separated from infrastructure.

---

# 34. Complete reconciliation algorithm

The complete algorithm will conceptually work like this:

```text
START
  ↓
Validate batch
  ↓
Load reconciliation configuration
  ↓
Load Ledger transactions
  ↓
Load Bank transactions
  ↓
Normalize required values
  ↓
Build Bank lookup structure
  ↓
Create matched-bank tracker
  ↓
For each Ledger transaction
       ↓
Find Bank candidate
       ↓
Candidate found?
    /        \
   NO         YES
   ↓           ↓
MISSING_      Compare
IN_BANK       configured fields
                ↓
             Classify
                ↓
        Save reconciliation result
                ↓
        Mark bank transaction used
  ↓
Process all Ledger transactions
  ↓
Find unused Bank transactions
  ↓
Mark them MISSING_IN_LEDGER
  ↓
Aggregate all results
  ↓
Calculate summary
  ↓
Return results + summary
END
```

---

# 35. Example of the complete engine

Suppose we have:

### Ledger

| Reference | Amount | Date   |
| --------- | -----: | ------ |
| TXN001    |   1000 | Aug 10 |
| TXN002    |   2500 | Aug 10 |
| TXN003    |   5000 | Aug 11 |
| TXN004    |    800 | Aug 11 |

### Bank

| Reference | Amount | Date   |
| --------- | -----: | ------ |
| TXN001    |   1000 | Aug 10 |
| TXN002    |   2200 | Aug 10 |
| TXN003    |   5000 | Aug 12 |
| TXN005    |    900 | Aug 11 |

### Strict configuration

```text
Primary:
Reference

Verification:
Amount
Date

Amount tolerance:
₹0

Date tolerance:
0 days
```

The engine produces:

| Reference | Result            |
| --------- | ----------------- |
| TXN001    | MATCHED           |
| TXN002    | AMOUNT_MISMATCH   |
| TXN003    | DATE_MISMATCH     |
| TXN004    | MISSING_IN_BANK   |
| TXN005    | MISSING_IN_LEDGER |

And summary:

```text
Total Ledger:        4
Total Bank:          4
Matched:             1
Amount Mismatch:     1
Date Mismatch:       1
Missing in Bank:     1
Missing in Ledger:   1
```

---

# 36. Now change the configuration

Suppose we change:

```text
Amount tolerance = ₹10
Date tolerance = 1 day
```

Now:

### TXN003

```text
Ledger: Aug 11
Bank: Aug 12
```

Difference:

```text
1 day
```

So it can now qualify as:

```text
MATCHED_WITH_TOLERANCE
```

depending on our exact rule definition.

Similarly, if:

```text
Ledger = ₹1000
Bank = ₹995
```

and:

```text
Amount tolerance = ₹10
```

then it can also qualify as:

```text
MATCHED_WITH_TOLERANCE
```

This demonstrates why the same engine can produce different results based on configuration **without changing the underlying algorithm**.

---

# 37. What happens when the reconciliation is complete?

The engine's job ends after producing the results and summary.

Then the broader application takes over:

```text
Engine
 ↓
Results saved
 ↓
Summary saved/generated
 ↓
Batch status updated
 ↓
Audit event created
 ↓
Maker reviews
 ↓
Maker submits
 ↓
Checker reviews
 ↓
Approve / Reject
```

The Maker-Checker workflow and audit trail are therefore **downstream governance features**, not responsibilities of the matching algorithm itself. Your project documentation describes the Maker-Checker process as a separate governance layer around the reconciliation results. 

---

# 38. Audit trail around reconciliation

Whenever reconciliation is executed, we should record an audit event such as:

```text
Action:
RECONCILIATION_RUN

User:
Maker ID

Batch:
BATCH001

Configuration:
Reference + Amount + Date

Amount tolerance:
₹10

Date tolerance:
1 day

Timestamp:
2026-08-12 13:30
```

This is important because your project isn't only a reconciliation system. It is a **Reconciliation + Audit Trail System**.

An audit trail records business actions such as reconciliation runs, batch submissions, approvals, rejections, and changes, whereas ordinary application logs are meant more for technical debugging and server behavior. 

---

# 39. Re-running reconciliation

We also need to consider what happens if the Maker clicks:

```text
Run Reconciliation
```

twice.

We don't want duplicate results accidentally being created.

Therefore, the system should have a clear re-run strategy.

One option is:

```text
Existing results?
      ↓
     YES
      ↓
Invalidate/replace old results
      ↓
Run new reconciliation
```

Another option is to prevent re-running unless the user explicitly chooses:

```text
Re-run Reconciliation
```

For your project, I recommend allowing re-runs **only when explicitly requested**, especially when the configuration or source data has changed.

Every re-run should also create an audit record.

---

# 40. Idempotency

This leads to an important engineering concept: **idempotency**.

We want repeated accidental requests to avoid creating inconsistent duplicate reconciliation results.

For example:

```text
POST /reconciliation/B001/run
```

should not blindly create another set of results every time someone double-clicks the button.

The backend should check the current state and existing reconciliation run before proceeding.

This makes the system more reliable.

---

# 41. What the engine should NOT do

Keeping boundaries clear is just as important.

The reconciliation engine should **not**:

* Authenticate users
* Generate JWTs
* Parse Excel files
* Manage user roles
* Approve batches
* Reject batches
* Send emails
* Render dashboards
* Directly handle HTTP requests
* Decide whether a Maker is authorized

Those belong to other layers.

The engine's responsibility is:

> **Compare transactions according to configured rules and produce reconciliation results.**

---

# 42. Final architecture

The complete architecture we are aiming for is:

```text
                         USER
                          │
                          ↓
                    React Frontend
                          │
                          ↓
                    REST API Layer
                          │
             ┌────────────┴────────────┐
             ↓                         ↓
        Authentication              RBAC
             │                         │
             └────────────┬────────────┘
                          ↓
                     Batch Service
                          │
                          ↓
                   Data Ingestion
                          │
                ┌─────────┴─────────┐
                ↓                   ↓
             Ledger                Bank
              Data                  Data
                └─────────┬─────────┘
                          ↓
                    MongoDB
                          │
                          ↓
             Reconciliation Service
                          │
                          ↓
                Reconciliation Config
                          │
                          ↓
              ┌───────────────────────┐
              │ RECONCILIATION ENGINE │
              └───────────┬───────────┘
                          ↓
                  Candidate Matching
                          ↓
                  Field Comparison
                          ↓
                   Classification
                          ↓
                Transaction Results
                          ↓
                     Aggregation
                          ↓
                    Batch Summary
                          │
              ┌───────────┴───────────┐
              ↓                       ↓
        Maker-Checker             Audit Trail
              │                       │
              └───────────┬───────────┘
                          ↓
                     Dashboard
```

---

# 43. The complete story you should remember

If an interviewer asks:

### **"Explain your reconciliation engine."**

You can say:

> **"The reconciliation engine is the core business-logic component of my payment reconciliation system. It compares the company's ledger transactions with corresponding bank transactions for a particular reconciliation batch. Before reconciliation, the uploaded Excel data is parsed, validated, normalized, and stored in MongoDB, so the engine works only with structured transaction data.**
>
> **I designed the engine to support both predefined and configurable reconciliation rules. In standard mode, the system uses a predefined rule set, while in custom mode the Maker can configure the matching criteria, such as the primary reference field, amount and date verification, amount tolerance, and date tolerance. The configuration is stored with the batch so that we know exactly which rules were used for a particular reconciliation run.**
>
> **For efficiency, instead of comparing every ledger transaction with every bank transaction, I build a lookup structure based on the primary matching key, such as the transaction reference. This reduces the matching process from an O(N×M) brute-force approach to approximately O(N+M), excluding database operations and candidate handling. I also account for duplicate references by allowing multiple candidate transactions rather than overwriting them.**
>
> **For every ledger transaction, the engine first searches for a corresponding bank candidate. If none exists, it classifies the transaction as MISSING_IN_BANK. If a candidate exists, it compares the configured fields and classifies the result as MATCHED, AMOUNT_MISMATCH, DATE_MISMATCH, or another configured status. After processing the ledger side, the engine checks for bank transactions that were never matched and classifies them as MISSING_IN_LEDGER.**
>
> **The engine produces both transaction-level reconciliation results and a batch-level summary containing counts such as total transactions, matched transactions, mismatches, missing transactions, and match percentage. The results are then used by the Maker-Checker workflow, while important actions such as running reconciliation or changing its configuration are recorded in the audit trail. This makes the reconciliation process not only automated but also configurable, traceable, and reproducible."**

That is the **core explanation** I want you to be able to give without looking at your notes.

---

# 44. The most important concepts to remember

If you forget everything else, remember these **10 points**:

```text
1. Ledger + Bank
       ↓
2. Normalized transactions
       ↓
3. Reconciliation configuration
       ↓
4. Primary matching key
       ↓
5. Efficient lookup
       ↓
6. Compare configured fields
       ↓
7. Classify differences
       ↓
8. Detect unmatched transactions on both sides
       ↓
9. Generate results + summary
       ↓
10. Save configuration + audit the process
```

And the **one-line definition** of your engine is:

> **"The Reconciliation Engine is a configurable rule-based component that efficiently matches Ledger and Bank transactions, classifies discrepancies, and generates transaction-level results and batch-level reconciliation summaries."**

That is the definition I'd use throughout the project.

---

## Our implementation plan

When we actually start coding, I suggest we **do not immediately write the complete engine**.

We'll build it in this order:

### Phase 1 — Define the transaction structure

Exactly what fields exist in your Ledger and Bank documents.

### Phase 2 — Define `ReconciliationConfig`

Exactly what the Maker can configure.

### Phase 3 — Define matching rules

What constitutes:

* `MATCHED`
* `MATCHED_WITH_TOLERANCE`
* `AMOUNT_MISMATCH`
* `DATE_MISMATCH`
* `MISSING_IN_BANK`
* `MISSING_IN_LEDGER`
* duplicate/multiple-candidate situations.

### Phase 4 — Build the core engine

First with sample arrays, **without MongoDB or Express**.

### Phase 5 — Test edge cases

Duplicates, missing references, tolerance, empty files, invalid configuration, etc.

### Phase 6 — Integrate MongoDB

Fetch transactions using `batchId` and save reconciliation results.

### Phase 7 — Build the API

Connect the engine to your Express backend.

### Phase 8 — Connect React

Create the reconciliation settings UI, run button, results table, filters, and summary.

### Phase 9 — Add audit + batch lifecycle

Make reconciliation part of the complete Maker-Checker flow.

**This order is important:** first we make sure the *brain* of the system is correct, then we connect the database, API, and frontend around it.
