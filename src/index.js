import "./styles.css";
import * as projectManager from "./logic/projectManager.js";
import * as todoManager from "./logic/todoManager.js";
import { appState } from "./state/AppState.js";
import { renderSidebar } from "./ui/renderSidebar.js";
import { renderTasks } from "./ui/renderTasks.js";

function initApp() {
  if (appState.projects.length === 0) projectManager.createProject("Inbox");
}

initApp();

// testing:
console.log("Init app state", appState);

import { mockProjects } from "./mockData.js";
appState.projects = mockProjects;
appState.currentProjectId = mockProjects[0].id;

console.log("Add mock projects", appState);

renderSidebar();
renderTasks();

// console.log("Create project...");
// projectManager.createProject("Inbox1");
// console.log(appState);

// console.log("Delete project...");
// projectManager.deleteProjectById(projectManager.getProjectByName("Inbox1").id);
// console.log(appState);

// console.log("Create todo...");
// todoManager.createTodo("task", "description", "today", "1");
// console.log(appState.projects[0].todos);

// console.log("Toggle todo...");
// todoManager.toggleTodoById(appState.projects[0].todos[0].id);
// console.log(appState.projects[0].todos);

// console.log("Delete todo...");
// todoManager.deleteTodoById(appState.projects[0].todos[0].id);
// console.log(appState.projects[0].todos);

const extendBtn = document.querySelector("#test-extend-btn");

extendBtn.addEventListener("click", () => {
  const todoApp = document.querySelector(".todo-app");
  const detailsPanel = document.querySelector(".details-panel");

  todoApp.classList.toggle("open");
  detailsPanel.classList.toggle("open");
});

const dpTaskTextArea = document.querySelector(".dp-task-description");

dpTaskTextArea.addEventListener("input", () => {
  dpTaskTextArea.style.height = "auto";
  dpTaskTextArea.style.height = dpTaskTextArea.scrollHeight + "px";
});
