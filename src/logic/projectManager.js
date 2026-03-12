import { Project } from "../models/Project";
import { appState } from "../state/AppState";

function createProject(name) {
  const project = new Project(name);
  appState.projects.push(project);
}

function deleteProject(id) {
  appState.projects = appState.projects.filter((project) => project.id !== id);
}

function getProject(id) {
  return appState.projects.find((project) => project.id === id);
}

function setCurrentProject(id) {
  appState.currentProjectId = id;
}

function getCurrentProject() {
  return getProject(appState.currentProjectId);
}

export {
  createProject,
  deleteProject,
  getProjectById,
  setCurrentProject,
  getCurrentProject,
};
