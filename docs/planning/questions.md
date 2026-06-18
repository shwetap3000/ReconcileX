# TERMS

Reconciliation
Merchant settlement report
Invoice
UPI
Payment gateway
Merchant settlement report
Transaction ID
Gateway Ref
UTR
webhook failure
delayed callback
timeout issue
tampering
parsing issue
webhook duplication
IFSC
SAP
ERP systems
Segregation of Duties (SoD) (maker, checker)
Soft Delete
Principle of Least Privilege (Principle of Least Privilege)






# QUESTIONS
In fintech even ₹1 mismatch matters.. Why??
If csv files are messy so why we don't use other type of file format?






# INTERVIEW QUESTIONS

If someone asks:
Why don't you allow role selection during registration?

Answer:
"Roles determine system permissions. Allowing users to assign their own roles creates privilege escalation risks. Therefore, every new user is registered as a Maker by default, and only an existing Admin can promote users to Checker or Admin."


If asked:
Why do you use both findOne() and unique: true?

Answer:
"findOne() provides a better user experience by showing a clear error message, while unique: true provides database-level protection against race conditions and duplicate records."