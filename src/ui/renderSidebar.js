import * as projectManager from "../logic/projectManager.js";

const projectSvgMarkup = `
    <svg
      class="icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <title>notebook-multiple</title>
      <path d="M9.05,9H7.06V6H9.05V4.03H7.06V3.03C7.06,1.92 7.95,1.04 9.05,1.04H15.03V8L17.5,6.5L20,8V1.04H21C22.05,1.04 23,2 23,3.03V17C23,18.03 22.05,19 21,19H9.05C8,19 7.06,18.05 7.06,17V16H9.05V14H7.06V11H9.05V9M1,18H3V15H1V13H3V10H1V8H3V5H5V8H3V10H5V13H3V15H5V18H3V20H5V21H21V23H5A2,2 0 0,1 3,21V20H1V18Z"/>
    </svg>
  `;
export const renderSidebar = () => {
  // DOM
  const projectsList = document.querySelector(".projects-list");

  // read state
  const projects = projectManager.getAllProjects();

  // clear container
  while (projectsList.firstElementChild) {
    projectsList.removeChild(projectsList.firstElementChild);
  }

  // create DOM elements
  for (const project of projects) {
    const sidebarList = document.createElement("li");
    sidebarList.classList.add("sidebar-li");

    const sidebarAnchor = document.createElement("button");
    sidebarAnchor.classList.add("sidebar-btn");

    // project icon svg injection
    sidebarAnchor.innerHTML = projectSvgMarkup;

    // project title
    const projectTitle = document.createElement("span");
    projectTitle.classList.add("sidebar-project-title");
    projectTitle.textContent = project.name;

    // append to container
    sidebarAnchor.append(projectTitle);
    sidebarList.append(sidebarAnchor);
    projectsList.append(sidebarList);
  }
};
