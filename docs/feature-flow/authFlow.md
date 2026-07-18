In the Payment Reconciliation & Audit Trail System, user registration is not available to the public because the application is intended for internal organizational use only. During the initial system setup, a Super Admin account is created by the system administrator. Only users with the Admin role have permission to create, update, activate, deactivate, or delete user accounts. When a new employee (such as a Maker, Checker, Auditor, or another Admin) needs access, the Admin creates the account by entering the employee's details, assigning the appropriate role, and generating a temporary username and password. These credentials are securely shared with the employee, who can then log in using the Login page. On the first login, the user is required to change the temporary password to a personal password before accessing the system. After authentication, the system verifies the user's role and grants access only to the modules and actions permitted for that role. Every login, user creation, password change, and account modification is recorded in the Audit Trail to maintain accountability and security.

System Setup
      │
      ▼
Super Admin account created
      │
      ▼
Admin logs into the system
      │
      ▼
Admin creates a new user
(Employee details + Role + Temporary Password)
      │
      ▼
Credentials shared securely with employee
      │
      ▼
Employee logs in using temporary credentials
      │
      ▼
First Login → Change Password
      │
      ▼
System authenticates user
      │
      ▼
Role is verified (Admin / Maker / Checker / Auditor)
      │
      ▼
User is redirected to the authorized dashboard
      │
      ▼
All actions are recorded in the Audit Trail