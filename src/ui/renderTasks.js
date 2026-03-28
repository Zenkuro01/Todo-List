import * as projectManager from "../logic/projectManager.js";

export const renderTasks = () => {
  // SVGs
  const subtasksFeatureSvgMarkup = `
    <svg
      class="task-feature-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <title>file-tree</title>
      <path d="M3,3H9V7H3V3M15,10H21V14H15V10M15,17H21V21H15V17M13,13H7V18H13V20H7L5,20V9H7V11H13V13Z" />
      </svg>
  `;
  const dueDateFeatureSvgMarkup = `
    <svg
      class="task-feature-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <title>calendar-range</title>
      <path d="M9,10H7V12H9V10M13,10H11V12H13V10M17,10H15V12H17V10M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19Z"/>
    </svg>
  `;

  // DOM
  const tasksContainer = document.querySelector(".tasks-container");

  // read state
  const currentProject = projectManager.getCurrentProject();
  const tasks = currentProject.todos;

  // clear container
  while (tasksContainer.firstElementChild) {
    tasksContainer.removeChild(tasksContainer.firstElementChild);
  }

  // create DOM elements
  for (const task of tasks) {
    // task card
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");
    taskCard.dataset.id = task.id;

    // checkbox
    const taskCheckbox = document.createElement("input");
    taskCheckbox.setAttribute("type", "checkbox");
    taskCheckbox.dataset.id = task.id;
    taskCheckbox.classList.add("task-checkbox");

    switch (task.priority) {
      case "p1":
        taskCheckbox.classList.add("checkbox-priority-1");
        break;
      case "p2":
        taskCheckbox.classList.add("checkbox-priority-2");
        break;
      case "p3":
        taskCheckbox.classList.add("checkbox-priority-3");
        break;
      case "p4":
        taskCheckbox.classList.add("checkbox-priority-4");
        break;
    }

    if (task.completed) {
      taskCheckbox.checked = true;
    }

    // task content
    const taskContent = document.createElement("div");
    taskContent.classList.add("task-content");

    const taskTitle = document.createElement("div");
    taskTitle.textContent = task.title;
    taskTitle.classList.add("task-title");
    if (task.completed) {
      taskTitle.classList.add("task-checked");
    }

    const taskDescription = document.createElement("div");
    taskDescription.textContent = task.description;
    taskDescription.classList.add("task-description");

    taskContent.append(taskTitle, taskDescription);

    // task features
    const taskFeatures = document.createElement("div");
    taskFeatures.classList.add("task-features");

    let hasFeatures = false;

    // task features -- subtasks
    const taskSubtasksTotal = task.subtasks.length;

    // add the feature only if there are subtasks available
    if (taskSubtasksTotal > 0) {
      hasFeatures = true;

      const taskSubtasksCompleted = task.subtasks.filter(
        (st) => st.completed === true,
      ).length;

      const taskSubtasks = document.createElement("div");
      taskSubtasks.classList.add("task-feature", "task-subtasks");

      taskSubtasks.innerHTML = subtasksFeatureSvgMarkup;

      const taskSubtasksValue = document.createElement("span");
      taskSubtasksValue.classList.add("task-subtasks-value");
      taskSubtasksValue.textContent = `${taskSubtasksCompleted}/${taskSubtasksTotal}`;

      taskSubtasks.append(taskSubtasksValue);
      taskFeatures.append(taskSubtasks);
    }

    // task features -- due-date
    if (task.dueDate !== "") {
      hasFeatures = true;

      const taskDueDate = document.createElement("div");
      taskDueDate.classList.add("task-feature", "task-due-date");

      taskDueDate.innerHTML = dueDateFeatureSvgMarkup;

      const taskDueDateValue = document.createElement("span");
      taskDueDateValue.textContent = task.dueDate;

      taskDueDate.append(taskDueDateValue);
      taskFeatures.append(taskDueDate);
    }

    // append to task card
    taskCard.append(taskCheckbox, taskContent);

    if (hasFeatures) {
      taskCard.append(taskFeatures);
    }

    // append to container
    tasksContainer.append(taskCard);
  }
};
