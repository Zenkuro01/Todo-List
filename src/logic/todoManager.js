import * as projectManager from "./projectManager.js";
import { Todo } from "../models/Todo.js";

function createTodo(title, description, dueDate, priority) {
  const todo = new Todo(title, description, dueDate, priority);
  const currentProject = projectManager.getCurrentProject();
  currentProject.todos.push(todo);
  return todo;
}

function toggleTodoById(id) {
  const currentProject = projectManager.getCurrentProject();
  const todo = currentProject.todos.find((todo) => todo.id === id);
  todo.toggleComplete();
}

function deleteTodoById(id) {
  const currentProject = projectManager.getCurrentProject();
  currentProject.todos = currentProject.todos.filter((todo) => todo.id !== id);
}

export { createTodo, toggleTodoById, deleteTodoById };
