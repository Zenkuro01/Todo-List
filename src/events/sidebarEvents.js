import * as projectManager from "../logic/projectManager.js";
import { renderTasks } from "../ui/renderTasks.js";
import { renderSidebar } from "../ui/renderSidebar.js";

export const initSidebarEvents = () => {
  const projectsList = document.querySelector(".projects-list");

  projectsList.addEventListener("click", (event) => {
    const sidebarBtn = event.target.closest(".sidebar-btn");
    if (!sidebarBtn) return;

    projectManager.setCurrentProjectById(sidebarBtn.dataset.id);
    renderSidebar();
    renderTasks();
  });
};
