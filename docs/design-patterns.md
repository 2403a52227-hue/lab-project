# BookNest — Behavioral Design Pattern Notes

## Problem statement
Libraries need a simple way to browse book records, track loans, notify readers when availability changes, and manage policy rules without tightly coupling every feature.

## System design
- **Presentation layer:** `index.html` and `css/style.css`.
- **Application layer:** `js/app.js` manages navigation, rendering, form handling, local persistence and events.
- **Pattern layer:** `js/patterns.js` contains Observer, Strategy and Command classes.
- **Persistence:** `localStorage` stores demo catalogue state, notifications and activity on the current browser.

## Pattern 1 — Observer
**Intent:** Define a one-to-many dependency so observers receive updates when a subject changes.

- Subject: `Book`
- Observer: `StudentNotification`
- Subject operations: `subscribe(observer)`, `unsubscribe(observer)`, `notifyObservers(event)`
- Trigger: borrow, return, add book, or the librarian test-notification action.
- OOP concepts: encapsulation of observer list, abstraction via `update()`, polymorphism can be extended with other observers.

Flow:
`Reader action → Book.setAvailability() → Book.notifyObservers() → StudentNotification.update() → notification UI`

## Pattern 2 — Strategy
**Intent:** Encapsulate interchangeable algorithms and allow the algorithm to be selected at runtime.

- Context: `FineCalculator`
- Strategies: `StandardFineStrategy`, `StudentFineStrategy`, `NoFineStrategy`
- Example: 6 days late results in ₹60, ₹30 or ₹0 respectively.
- OOP concepts: abstraction through a common `calculate()` interface, polymorphism through interchangeable strategies.

Flow:
`Select policy → FineCalculator.setStrategy() → calculate(days) → display estimate`

## Pattern 3 — Command
**Intent:** Encapsulate a request as an object so actions can be recorded and undone.

- Commands: `BorrowBookCommand`, `ReturnBookCommand`, `AddBookCommand`
- Invoker/history: `CommandManager`
- Receiver: the `Book` record and app update functions.
- Undo: reverse the most recent command executed in the current session.

Flow:
`User action → CommandManager.execute(command) → command.execute() → state update → activity history`
`Undo click → CommandManager.undo() → command.undo() → state restored`

## Limitations
- No authentication, server-side database or multi-user synchronization.
- Local storage is per browser and device.
- Undo history is held in memory for the active page session; activity records persist locally.
- Fine policies are illustrative examples.
