/* BookNest SESD project: behavioral design patterns */
class Book {
  constructor(data) { Object.assign(this, data); this.observers = []; }
  subscribe(observer) { if (!this.observers.includes(observer)) this.observers.push(observer); }
  unsubscribe(observer) { this.observers = this.observers.filter(item => item !== observer); }
  notifyObservers(event) { this.observers.forEach(observer => observer.update(this, event)); }
  setAvailability(available, event = "availability_changed") {
    this.available = available;
    this.notifyObservers(event);
  }
}
class StudentNotification {
  constructor(name, callback) { this.name = name; this.callback = callback; }
  update(book, event) {
    const message = event === "borrowed" ? `"${book.title}" was borrowed.` :
      event === "returned" ? `"${book.title}" is available again.` :
      event === "added" ? `"${book.title}" was added to the catalogue.` :
      `Availability changed for "${book.title}".`;
    this.callback({ title: "Library update", message, bookId: book.id, event, at: new Date().toISOString() });
  }
}
class StandardFineStrategy { calculate(daysLate) { return Math.max(0, daysLate) * 10; } get rate() { return 10; } get name() { return "Standard"; } }
class StudentFineStrategy { calculate(daysLate) { return Math.max(0, daysLate) * 5; } get rate() { return 5; } get name() { return "Student"; } }
class NoFineStrategy { calculate() { return 0; } get rate() { return 0; } get name() { return "No fine"; } }
class FineCalculator {
  constructor(strategy = new StandardFineStrategy()) { this.strategy = strategy; }
  setStrategy(strategy) { this.strategy = strategy; }
  calculate(daysLate) { return this.strategy.calculate(Number(daysLate) || 0); }
}
class BorrowBookCommand {
  constructor(book, notify) { this.book = book; this.notify = notify; this.previousState = book.available; this.executed = false; }
  execute() { if (!this.book.available) throw new Error("This book is already borrowed."); this.previousState = this.book.available; this.book.setAvailability(false, "borrowed"); this.executed = true; }
  undo() { if (this.executed) { this.book.setAvailability(this.previousState, "returned"); this.executed = false; } }
  describe() { return `Borrowed “${this.book.title}”`; }
  get type() { return "borrow"; }
}
class ReturnBookCommand {
  constructor(book, notify) { this.book = book; this.notify = notify; this.previousState = book.available; this.executed = false; }
  execute() { if (this.book.available) throw new Error("This book is already available."); this.previousState = this.book.available; this.book.setAvailability(true, "returned"); this.executed = true; }
  undo() { if (this.executed) { this.book.setAvailability(this.previousState, "borrowed"); this.executed = false; } }
  describe() { return `Returned “${this.book.title}”`; }
  get type() { return "return"; }
}
class AddBookCommand {
  constructor(book, add, remove) { this.book = book; this.add = add; this.remove = remove; this.executed = false; }
  execute() { this.add(this.book); this.executed = true; }
  undo() { if (this.executed) { this.remove(this.book.id); this.executed = false; } }
  describe() { return `Added “${this.book.title}” to the catalogue`; }
  get type() { return "add"; }
}
class CommandManager {
  constructor() { this.history = []; this.undone = []; }
  execute(command) { command.execute(); this.history.push({ command, description: command.describe(), type: command.type, at: new Date().toISOString() }); this.undone = []; }
  undo() { const entry = this.history.pop(); if (!entry) return null; entry.command.undo(); this.undone.push(entry); return entry; }
  clear() { this.history = []; this.undone = []; }
}
window.BookNestPatterns = { Book, StudentNotification, StandardFineStrategy, StudentFineStrategy, NoFineStrategy, FineCalculator, BorrowBookCommand, ReturnBookCommand, AddBookCommand, CommandManager };