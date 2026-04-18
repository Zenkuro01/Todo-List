import { appState } from "../state/AppState.js";
import { renderDetailsPanel } from "../ui/renderDetailsPanel.js";

export const initTasksEvents = () => {
  const tasksContainer = document.querySelector(".tasks-container");

  tasksContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("task-checkbox")) {
      return;
    }

    const taskCard = event.target.closest(".task-card");
    appState.selectedTaskId = taskCard.dataset.id;
    renderDetailsPanel();

    document.querySelector(".todo-app").classList.add("open");
    document.querySelector(".details-panel").classList.add("open");
  });
};
