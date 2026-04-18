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
};
