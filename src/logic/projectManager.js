import { Project } from "../models/Project.js";
import { appState } from "../state/AppState.js";

const DEFAULT_PROJECT_NAME = "Inbox";

function createProject(name) {
  if (getProjectByName(name)) {
    console.error("The project name already exists");
    return null;
  }

  const project = new Project(name);
  appState.projects.push(project);

  // Set the new Project as the currentProject
  appState.currentProjectId = project.id;
}

function getProjectById(id) {
  const project = appState.projects.find((project) => project.id === id);

  if (!project) return null;

  return project;
}

function getProjectByName(name) {
  const project = appState.projects.find((project) => project.name === name);

  if (!project) return null;

  return project;
}

function deleteProjectById(id) {
  const project = getProjectById(id);

  if (!project) {
    console.error("The project doesn't exist");
    return null;
  }

  if (project.name === DEFAULT_PROJECT_NAME) {
    console.error("The default project cannot be deleted");
    return null;
  }

  appState.projects = appState.projects.filter((project) => project.id !== id);

  if (project.id === appState.currentProjectId)
    appState.currentProjectId = getProjectByName(DEFAULT_PROJECT_NAME).id;
}

function setCurrentProjectById(id) {
  if (!getProjectById(id)) {
    console.error("The project doesn't exist");
    return null;
  }

  appState.currentProjectId = id;
}

function getCurrentProject() {
  return getProjectById(appState.currentProjectId);
}

function getAllProjects() {
  return appState.projects;
}

export {
  createProject,
  getProjectById,
  getProjectByName,
  deleteProjectById,
  setCurrentProjectById,
  getCurrentProject,
  getAllProjects,
};
