import * as projectManager from "../logic/projectManager.js";

export const renderDetailsPanel = (currentTaskID) => {
  // SVGs
  const projectSvg = `
    <svg
      class="dp-task-feature-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      >
      <title>inbox</title>
      <path d="M19,15H15A3,3 0 0,1 12,18A3,3 0 0,1 9,15H5V5H19M19,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z"/>
    </svg>
  `;

  const dueDateSvg = `
    <svg
      class="dp-task-feature-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <title>calendar-range</title>
      <path d="M9,10H7V12H9V10M13,10H11V12H13V10M17,10H15V12H17V10M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19Z"/>
    </svg>
  `;

  const prioritySvg = `
    <svg
      class="dp-task-feature-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <title>flag-variant</title>
      <path d="M6,3A1,1 0 0,1 7,4V4.88C8.06,4.44 9.5,4 11,4C14,4 14,6 16,6C19,6 20,4 20,4V12C20,12 19,14 16,14C13,14 13,12 11,12C8,12 7,14 7,14V21H5V4A1,1 0 0,1 6,3Z"/>
    </svg>
  `;

  const subtaskHeaderSvg = `
    <svg
      class="dp-task-feature-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <title>file-tree</title>
      <path d="M3,3H9V7H3V3M15,10H21V14H15V10M15,17H21V21H15V17M13,13H7V18H13V20H7L5,20V9H7V11H13V13Z"/>
    </svg>
  `;

  // DOM
  const detailsPanelContainer = document.querySelector(".details-panel");

  // read state
  const task = projectManager.getTaskById(currentTaskID);

  if (task === null) {
    console.error("Task not found!");
    return 1;
  }

  // clear container
  while (detailsPanelContainer.firstElementChild) {
    detailsPanelContainer.removeChild(detailsPanelContainer.firstElementChild);
  }

  // create DOM elements

  // ===== CONTENT =====
  const content = document.createElement("div");
  content.classList.add("dp-task-content");

  const titleContainer = document.createElement("div");
  titleContainer.classList.add("dp-task-title-container");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");
  checkbox.dataset.id = task.id;
  checkbox.checked = task.completed;

  switch (task.priority) {
    case "p1":
      checkbox.classList.add("checkbox-priority-1");
      break;
    case "p2":
      checkbox.classList.add("checkbox-priority-2");
      break;
    case "p3":
      checkbox.classList.add("checkbox-priority-3");
      break;
    case "p4":
      checkbox.classList.add("checkbox-priority-4");
      break;
  }

  const title = document.createElement("div");
  title.classList.add("dp-task-title");
  title.textContent = task.title;

  if (task.completed) title.classList.add("task-checked");

  titleContainer.append(checkbox, title);

  const textarea = document.createElement("textarea");
  textarea.classList.add("dp-task-description");
  textarea.placeholder = "Description...";
  textarea.value = task.description;

  content.append(titleContainer, textarea);

  // ===== FEATURES =====
  const features = document.createElement("div");
  features.classList.add("dp-task-features");

  const projectFeature = document.createElement("div");
  projectFeature.classList.add("dp-task-feature");
  projectFeature.innerHTML = projectSvg;

  const projectText = document.createElement("span");
  projectText.textContent = projectManager.getCurrentProject().name;

  projectFeature.append(projectText);

  const dueDateFeature = document.createElement("div");
  dueDateFeature.classList.add("dp-task-feature");
  dueDateFeature.innerHTML = dueDateSvg;

  const dueDateText = document.createElement("span");
  dueDateText.textContent = task.dueDate || "No date";

  dueDateFeature.append(dueDateText);

  const priorityFeature = document.createElement("div");
  priorityFeature.classList.add("dp-task-feature");
  priorityFeature.innerHTML = prioritySvg;

  const priorityText = document.createElement("span");
  switch (task.priority) {
    case "p1":
      priorityText.textContent = "Priority 1";
      break;
    case "p2":
      priorityText.textContent = "Priority 2";
      break;
    case "p3":
      priorityText.textContent = "Priority 3";
      break;
    case "p4":
      priorityText.textContent = "Priority 4";
      break;
  }

  priorityFeature.append(priorityText);

  features.append(projectFeature, dueDateFeature, priorityFeature);

  // ===== SUBTASKS =====
  const subtasksWrapper = document.createElement("div");
  subtasksWrapper.classList.add("dp-task-subtasks");

  const header = document.createElement("div");
  header.classList.add("dp-task-subtasks-header");
  header.innerHTML = subtaskHeaderSvg;

  const headerText = document.createElement("span");
  headerText.textContent = "Sub-tasks";

  header.append(headerText);

  const list = document.createElement("ul");
  list.classList.add("dp-task-subtasks-list");

  for (const subtask of task.subtasks) {
    const li = document.createElement("li");
    li.classList.add("dp-task-subtasks-list-item");

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = subtask.completed;

    const text = document.createElement("span");
    text.textContent = subtask.title;

    li.append(cb, text);
    list.append(li);
  }

  subtasksWrapper.append(header, list);

  // ===== APPEND TO CONTAINER =====
  detailsPanelContainer.append(content, features, subtasksWrapper);
};
