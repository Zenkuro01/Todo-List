import { appState } from "../state/AppState.js";
import * as projectManager from "../logic/projectManager.js";
import * as taskManager from "../logic/taskManager.js";
import { renderTasks } from "../ui/renderTasks.js";

export const initDetailsPanelEvents = () => {
  const detailsPanel = document.querySelector(".details-panel");

  detailsPanel.addEventListener("click", (event) => {
    if (event.target.closest(".dp-close-btn")) {
      document.querySelector(".todo-app").classList.remove("open");
      detailsPanel.classList.remove("open");
    }
  });

  detailsPanel.addEventListener("input", (event) => {
    if (event.target.classList.contains("dp-task-description")) {
      const textarea = event.target;
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  });

  detailsPanel.addEventListener("change", (event) => {
    const task = projectManager.getTaskById(appState.selectedTaskId);
    if (!task) return;

    if (event.target.classList.contains("dp-task-title")) {
      task.title = event.target.value;
      renderTasks();
    }

    if (event.target.classList.contains("dp-task-description")) {
      task.description = event.target.value;
      renderTasks();
    }

    if (event.target.classList.contains("dp-task-project-select")) {
      const newProjectId = event.target.value;

      const taskProject = taskManager.getTaskProject(task.id);

      if (
        taskProject &&
        taskManager.setTaskProject(task.id, taskProject.id, newProjectId)
      )
        renderTasks();
    }
  });
};
