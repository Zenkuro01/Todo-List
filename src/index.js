import "./styles.css";
import * as projectManager from "./logic/projectManager.js";
import { appState } from "./state/AppState.js";

function initApp() {
  if (appState.projects.length === 0) projectManager.createProject("Inbox");
}

initApp();

// testing:
console.log(appState);

projectManager.createProject("Inbox1");
console.log(appState);

projectManager.deleteProjectById(projectManager.getProjectByName("Inbox1").id);
console.log(appState);
