# BookNest — Smart Library Management System

A colorful, responsive, browser-based library management demo built for **SESD — Implementing Design Patterns II (Behavioral)**.

## Run the website
1. Extract the ZIP file.
2. Open the `BookNest-SESD-Colorful` folder in VS Code.
3. Open `index.html` in a browser, or install the VS Code **Live Server** extension and choose **Open with Live Server**.
4. No Node.js, Python server, API key, database, or build step is required. The app uses local browser storage to remember changes on the same browser/device.

## Features
- Dashboard with live catalogue, borrowed, available and notification counts.
- Search books by title, author or genre; filter by genre and availability.
- Borrow and return books with UI updates and notifications.
- My Borrowed Books page with due-date reminders.
- Activity log and undo for the most recent borrow/return/add command in the current session.
- Librarian desk to add books, remove books and view inventory.
- Fine calculator that switches between Standard (₹10/day), Student (₹5/day), and No Fine (₹0/day) strategies.
- Observer simulator and a design-pattern explanation dialog.
- Responsive layout for desktop, tablet and mobile.
- Uses `localStorage`; choose a fresh browser profile or clear site data to reset the demo.

## Design patterns implemented
### 1. Observer
`Book` is the subject and supports `subscribe`, `unsubscribe`, and `notifyObservers`. `StudentNotification.update()` receives a notification when book availability changes or a book is added.

### 2. Strategy
`FineCalculator` delegates calculation to interchangeable `StandardFineStrategy`, `StudentFineStrategy`, or `NoFineStrategy` objects. The user can change strategies while the app is running.

### 3. Command
`BorrowBookCommand`, `ReturnBookCommand`, and `AddBookCommand` encapsulate actions. `CommandManager` executes commands and can undo the latest command in the current page session.

## Project structure
```text
BookNest-SESD-Colorful/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   └── patterns.js
├── docs/
│   └── design-patterns.md
├── README.md
└── .gitignore
```

## GitHub Pages deployment
This is a static site, so it can be published with GitHub Pages:
1. Create a GitHub repository, e.g. `BookNest-SESD`.
2. Upload the contents of this folder (not the ZIP itself) to the repository root.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**, branch `main`, folder `/ (root)`, then save.
5. Wait for the Pages URL to appear in Settings → Pages. `index.html` is the entry page.

## Important notes for submission
- The project is a front-end demonstration; data is stored locally in each browser, not in a shared online database.
- Fine calculations are educational examples, not real institutional policy.
- Before submission, test borrowing, returning, undo, filters, add/remove, fine strategies, and the mobile layout.
