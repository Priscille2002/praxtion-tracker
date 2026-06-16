# Compliance Control Tracker

NIST SP 800-171 Internal Assessment Tool

Praxtion Technical Assessment
Prepared by Priscille M. Bakam

1. About the Project

This project is a small web application built as part of Praxtion's technical assessment.

The goal is to help a consultant track the implementation status of NIST SP 800-171 controls, document observations, and keep references to supporting evidence collected during an assessment.

Beyond implementing the required features, I also tried to think about how the application could remain easy to understand, maintain, and extend over time.

---

2. Getting Started

Requirements:

* Node.js 18 or higher

Run locally:

npm install
npm run dev


Then open:
http://localhost:5173


No backend setup is required.

3. Features

The application allows users to:

* View 15 NIST SP 800-171 controls across three control families;
* Update the implementation status of each control;
* Add notes and evidence references;
* Track assessment progress through dashboard metrics;
* Filter controls by status or family;
* Preserve changes between page refreshes using localStorage.


4. Data Structure

Each control is represented as a JavaScript object:

{
  id: "AC-1",
  family: "Access Control",
  title: "Policy and Procedures",
  description: "...",
  status: "Not Started",
  note: "",
  evidenceRef: "",
  lastUpdated: "2026-06-15"
}


The initial controls are stored in `controls.js`.

When the application starts, it first checks localStorage. If no saved data exists, it falls back to the default controls.

5. Project Structure

I organized the project into three main parts:

data      → stores the initial controls
logic     → handles updates and persistence
UI        → displays information to the user


I made this decision intentionally so that each part of the application would have a clear responsibility.

Data

`controls.js`

Contains the list of controls and the allowed status values.

Because these values are defined in one place, changes can be made without searching through the entire application.

Logic

`useControls.js`

Handles the application's behavior:

* loading saved data;
* saving changes to localStorage;
* updating statuses;
* updating notes and evidence;
* calculating dashboard metrics.

Keeping this logic separate from the UI helped reduce duplication and made the components easier to understand.

It also means that if localStorage were replaced by an API in the future, most of the changes would happen in this file.

UI Components

Each component focuses on a single responsibility.

| Component         | Purpose                      |
| ----------------- | ---------------------------- |
| App.jsx           | Connects everything together |
| Dashboard.jsx     | Displays progress metrics    |
| FilterBar.jsx     | Handles filtering            |
| ControlTable.jsx  | Displays the controls        |
| StatusBadge.jsx   | Shows the current status     |
| EvidenceModal.jsx | Adds notes and evidence      |
| Toast.jsx         | Shows save confirmations     |

This approach made the interface easier to reason about and avoided creating large components with multiple responsibilities.


6. Technical Decisions

Why React and Vite?

I chose React because reusable components fit naturally with this type of interface.

I used Vite because it provides a simple setup and fast development experience.

Why localStorage?

The assessment allowed local persistence.

Instead of spending time building a backend, I focused on the core functionality and user experience within the time available.

This trade-off felt more appropriate for a short technical assessment.

Why keep filters in App?

Filters affect what users see but do not modify the underlying data.

For that reason, I treated them as UI state rather than application state.

The dashboard always reflects the full assessment instead of only the filtered results.

7. Security Notes

Even though this is not a production application, I still tried to address a few common concerns:

* invalid statuses are rejected;
* user input is trimmed before storage;
* external links use `rel="noopener noreferrer"`;
* corrupted localStorage data falls back to default values;
* React's default escaping prevents user input from being rendered as executable HTML.

---

8. How to Use the Application

 - Start the application.

 - Review the list of controls.

 - Update control statuses.

 -  Add notes and evidence references.

 -  Use filters if needed.

 -  Refresh the page to confirm that changes are preserved.


9. What I Would Improve With More Time

If this project evolved into a more complete compliance solution, I would consider adding:

* file uploads for evidence instead of text-only references;
* export to CSV or PDF for reporting purposes;
* search functionality for larger assessments;
* audit trails showing who made changes, what changed, and when;
* authentication and role-based access control;
* review and approval workflows for evidence validation;
* unit and integration tests;
* backend persistence using a database;
* support for multiple users;
* accessibility improvements.

I think these additions would make the tool more suitable for real-world compliance environments.

10. Time Spent

I spent approximately 10–12 hours on this project.
A significant portion of that time went into understanding the requirements, revisiting React concepts, refining the implementation, testing the application, and documenting my decisions.
I also spent time simplifying the code so that I could confidently explain the implementation and the reasoning behind my choices.

11. Use of AI Tools

I used AI tools (Claude Anthropic, ChatGPT) selectively during this assessment to brainstorm ideas, review approaches, and challenge some design decisions.

The final implementation was manually reviewed, adapted, tested, and simplified where appropriate.

I also made sure that I understood the resulting code and could explain the reasoning behind the choices and trade-offs involved throughout the project.
