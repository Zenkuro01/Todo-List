import "./styles.css";
import * as projectManager from "./logic/projectManager.js";
import * as todoManager from "./logic/todoManager.js";
import { appState } from "./state/AppState.js";
import { renderSidebar } from "./ui/renderSidebar.js";
import { renderTasks } from "./ui/renderTasks.js";
import { renderDetailsPanel } from "./ui/renderDetailsPanel.js";

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

const tasksContainer = document.querySelector(".tasks-container");

tasksContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("task-checkbox")) {
    return;
  }

  const taskCard = event.target.closest(".task-card");
  renderDetailsPanel(taskCard.dataset.id);

  document.querySelector(".todo-app").classList.add("open");
  document.querySelector(".details-panel").classList.add("open");
});

const detailsPanel = document.querySelector(".details-panel");

detailsPanel.addEventListener("click", (event) => {
  if (event.target.closest(".dp-close-btn")) {
    document.querySelector(".todo-app").classList.remove("open");
    detailsPanel.classList.remove("open");
  }
});

const dpTaskTextArea = document.querySelector(".dp-task-description");

if (dpTaskTextArea) {
  dpTaskTextArea.addEventListener("input", () => {
    dpTaskTextArea.style.height = "auto";
    dpTaskTextArea.style.height = dpTaskTextArea.scrollHeight + "px";
  });
}
