"use strict";

const projects = {
  applepicker: {
    title: "Apple Picker",
    type: "Unity WebGL Game",

    description:
      "A Unity game where the player controls baskets to catch falling apples while managing score and gameplay interactions.",

    page:
      "projects/applepicker/index.html",

    repo:
      "https://github.com/Nathan-S1/ApplePicker"
  },

  tetrisai: {
    title: "Tetris AI",
    type: "Python Artificial Intelligence Game",

    description:
      "An AI designed to play Tetris while keeping its visual output readable and appealing. The project includes a normal animated version and a version that can accelerate falling pieces.",

    page:
      "projects/tetris-ai/index.html",

    repo:
      "https://github.com/Nathan-S1"
  },

  imagegenerator: {
    title: "AI Image Generator",
    type: "Artificial Intelligence Image Tool",

    description:
      "An image-generation project built with Python and artificial-intelligence libraries for creating and processing visual content.",

    page:
      "projects/image-generator/index.html",

    repo:
      "https://github.com/Nathan-S1/ImageGenerator"
  },

  videogenerator: {
    title: "AI Video Generator",
    type: "Artificial Intelligence Media Tool",

    description:
      "A multimedia-generation project that uses Python, image processing, and artificial-intelligence techniques to create video content.",

    page:
      "projects/video-generator/index.html",

    repo:
      "https://github.com/Nathan-S1/VideoGenerator"
  },

  texttospeech: {
    title: "Text-to-Speech Generator",
    type: "Browser Speech Tool",

    description:
      "A browser-based tool that converts entered text into spoken audio using voices available through the visitor's browser and operating system.",

    page:
      "projects/text-to-speech/index.html",

    repo:
      "https://github.com/Nathan-S1"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const projectSelect =
    document.getElementById("project-select");

  const summary =
    document.getElementById("project-summary");

  const selectedType =
    document.getElementById("selected-project-type");

  const selectedTitle =
    document.getElementById("selected-project-title");

  const selectedDescription =
    document.getElementById("selected-project-description");

  const loadButton =
    document.getElementById("load-project-button");

  const closeButton =
    document.getElementById("close-project-button");

  const message =
    document.getElementById("project-message");

  const viewer =
    document.getElementById("project-viewer");

  const frame =
    document.getElementById("project-frame");

  const loading =
    document.getElementById("project-loading");

  const activeTitle =
    document.getElementById("active-project-title");

  const activeType =
    document.getElementById("active-project-type");

  const activeRepo =
    document.getElementById("active-project-repo");

  const fullscreenButton =
    document.getElementById("fullscreen-project-button");

  const currentYear =
    document.getElementById("current-year");

  const mobileMenuButton =
    document.getElementById("mobile-menu-button");

  const navLinks =
    document.getElementById("nav-links");

  let activeProjectId = null;
  let activeProjectUrl = null;

  if (currentYear) {
    currentYear.textContent =
      new Date().getFullYear().toString();
  }

  function getSelectedProjectId() {
    return projectSelect.value;
  }

  function getSelectedProject() {
    const projectId = getSelectedProjectId();

    if (!projectId) {
      return null;
    }

    return projects[projectId] ?? null;
  }

  function displaySelection(project) {
    summary.hidden = false;

    selectedType.textContent =
      project.type;

    selectedTitle.textContent =
      project.title;

    selectedDescription.textContent =
      project.description;

    loadButton.disabled = false;

    message.textContent =
      `${project.title} selected. Press Load Project to open it.`;
  }

  function clearSelection() {
    summary.hidden = true;

    selectedType.textContent = "";
    selectedTitle.textContent = "";
    selectedDescription.textContent = "";

    loadButton.disabled = true;

    message.textContent =
      "Select a project to continue.";
  }

  function unloadProject(showMessage = true) {
    /*
      Replace the iframe page to stop the current project's
      audio, JavaScript, WebGL content, Python runtime and timers.
    */
    frame.onload = null;
    frame.src = "about:blank";

    viewer.hidden = true;
    loading.hidden = true;
    closeButton.disabled = true;
    fullscreenButton.disabled = true;

    activeProjectId = null;
    activeProjectUrl = null;

    activeTitle.textContent = "Project";
    activeType.textContent = "";
    activeRepo.href = "#";

    if (showMessage) {
      message.textContent =
        "The active project has been closed.";
    }
  }

  function loadProject(projectId, project) {
    /*
      Always unload the current project first.
      This ensures only one project is active at a time.
    */
    unloadProject(false);

    activeProjectId = projectId;
    activeProjectUrl = project.page;

    activeTitle.textContent =
      project.title;

    activeType.textContent =
      project.type;

    activeRepo.href =
      project.repo;

    viewer.hidden = false;
    loading.hidden = false;
    closeButton.disabled = false;
    fullscreenButton.disabled = false;

    message.textContent =
      `Loading ${project.title}...`;

    frame.onload = () => {
      loading.hidden = true;

      message.textContent =
        `${project.title} is now loaded.`;

      frame.onload = null;
    };

    frame.src = project.page;

    viewer.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function openActiveProjectInNewTab() {
    if (!activeProjectUrl) {
      message.textContent =
        "Load a project before opening it fullscreen.";

      return;
    }

    const openedWindow = window.open(
      activeProjectUrl,
      "_blank",
      "noopener,noreferrer"
    );

    if (!openedWindow) {
      message.textContent =
        "Your browser blocked the new tab. Allow pop-ups and try again.";
    }
  }

  projectSelect.addEventListener("change", () => {
    const project = getSelectedProject();

    if (!project) {
      clearSelection();
      return;
    }

    displaySelection(project);
  });

  loadButton.addEventListener("click", () => {
    const projectId = getSelectedProjectId();
    const project = getSelectedProject();

    if (!projectId || !project) {
      clearSelection();

      message.textContent =
        "Please select a project first.";

      return;
    }

    if (activeProjectId === projectId) {
      message.textContent =
        `${project.title} is already loaded.`;

      viewer.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      return;
    }

    loadProject(projectId, project);
  });

  closeButton.addEventListener("click", () => {
    unloadProject(true);
  });

  fullscreenButton.addEventListener("click", () => {
    openActiveProjectInNewTab();
  });

  mobileMenuButton.addEventListener("click", () => {
    const isOpen =
      navLinks.classList.toggle("open");

    mobileMenuButton.setAttribute(
      "aria-expanded",
      isOpen.toString()
    );

    mobileMenuButton.textContent =
      isOpen ? "Close" : "Menu";
  });

  navLinks
    .querySelectorAll("a")
    .forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");

        mobileMenuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        mobileMenuButton.textContent =
          "Menu";
      });
    });

  window.addEventListener("beforeunload", () => {
    frame.src = "about:blank";
  });

  clearSelection();
  unloadProject(false);
});
