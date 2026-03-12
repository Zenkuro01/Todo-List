class Todo {
  id = crypto.randomUUID();
  completed = false;
  subtasks = [];

  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }
}
