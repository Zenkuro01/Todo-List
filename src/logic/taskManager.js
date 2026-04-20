import * as projectManager from "./projectManager.js";

function setTaskProject(taskId, projectId, newProjectId) {
  if (projectId === newProjectId) return;

  const currentProject = projectManager.getProjectById(projectId);
  const newProject = projectManager.getProjectById(newProjectId);
  if (!currentProject || !newProject) {
    console.error("SetTaskProject::Project not found");
    return;
  }

  const taskIndex = currentProject.todos.findIndex(
    (task) => task.id === taskId,
  );

  if (taskIndex === -1) {
    console.error("SetTaskProject::Task not found");
    return;
  }

  // Use splice to extract the task directly, avoid .filter to not create a new array
  const [task] = currentProject.todos.splice(taskIndex, 1);
  newProject.todos.push(task);

  return true;
}

function getTaskProject(taskId) {
  const allProjects = projectManager.getAllProjects();
  return (
    allProjects.find((project) => project.todos.some((t) => t.id === taskId)) ||
    null
  );
}

export { setTaskProject, getTaskProject };
