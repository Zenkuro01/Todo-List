import "./styles.css";
import * as projectManager from "./logic/projectManager.js";
import * as todoManager from "./logic/todoManager.js";
import { appState } from "./state/AppState.js";
import { renderSidebar } from "./ui/renderSidebar.js";
import { renderTasks } from "./ui/renderTasks.js";
import { renderDetailsPanel } from "./ui/renderDetailsPanel.js";
import { initTasksEvents } from "./events/tasksEvents.js";
import { initDetailsPanelEvents } from "./events/detailsPanelEvents.js";
import { initSidebarEvents } from "./events/sidebarEvents.js";

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

initTasksEvents();
initDetailsPanelEvents();
initSidebarEvents();
