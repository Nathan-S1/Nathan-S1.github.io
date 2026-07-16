"use strict";

const projects = {
  applepicker: {
    title: "Apple Picker",
    type: "Unity WebGL Game",

    description:
      "A Unity game where the player controls baskets to catch " +
      "falling apples while managing score and gameplay interactions.",

    page: "projects/applepicker/index.html",

    repo:
      "https://github.com/Nathan-S1/ApplePicker"
  },

  tetrisai: {
    title: "Tetris AI",
    type: "Python Artificial Intelligence Game",

    description:
      "An AI designed to play Tetris with readable visual output. " +
      "It includes normal animated and accelerated drop modes.",

    page: "projects/tetris-ai/index.html",

    repo:
      "https://github.com/Nathan-S1"
  },

  imagegenerator: {
    title: "AI Image Generator",
    type: "GPU Artificial Intelligence Project",

    description:
      "A Stable Diffusion image-generation project that opens its " +
      "notebook in Google Colab for Python and GPU processing.",

    page: "projects/image-generator/index.html",

    repo:
      "https://github.com/Nathan-S1/ImageGenerator"
  },

  videogenerator: {
    title: "AI Video Generator",
    type: "GPU Artificial Intelligence Project",

    description:
      "A diffusion-based video-generation project that opens its " +
      "notebook in Google Colab for Python and GPU processing.",

    page: "projects/video-generator/index.html",

    repo:
      "https://github.com/Nathan-S1/VideoGenerator"
  },

  texttospeech: {
    title: "Text-to-Speech Generator",
    type: "Browser Speech Tool",

    description:
      "A browser tool that converts entered text into spoken audio " +
      "using voices installed in the visitor's browser and operating " +
      "system.",

    page: "projects/text-to-speech/index.html",

    repo:
      "https://github.com/Nathan-S1"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const byId = (id) => document.getElementById(id);

  const projectSelect = byId("project-select");
  const summary = byId("project-summary");

  const selectedType = byId("selected-project-type");
  const selectedTitle = byId("selected-project-title");
  const selectedDescription = byId(
    "selected-project-description"
  );

  const loadButton = byId("load-project-button");
  const closeButton = byId("close-project-button");
  const message = byId("project-message");

  const viewer = byId("project-viewer");
  const frame = byId("project-frame");
  const loading = byId("project-loading");

  const activeTitle = byId("active-project-title");
  const activeType = byId("active-project-type");
  const activeRepo = byId("active-project-repo");

  const fullscreenButton = byId(
    "fullscreen-project-button"
  );

  const currentYear = byId("current-year");

  const mobileMenuButton = byId(
    "mobile-menu-button"
  );

  const navLinks = byId("nav-links");

  const contactForm = byId("contact-form");

  const contactSubmitButton = byId(
    "contact-submit-button"
  );

  const contactStatus = byId("contact-status");

  let activeProjectId = null;
  let activeProjectUrl = null;

  if (currentYear) {
    currentYear.textContent =
      new Date().getFullYear().toString();
  }

  function selectedId() {
    return projectSelect.value;
  }

  function selectedProject() {
    return projects[selectedId()] ?? null;
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

  function displaySelection(project) {
    summary.hidden = false;

    selectedType.textContent = project.type;
    selectedTitle.textContent = project.title;
    selectedDescription.textContent =
      project.description;

    loadButton.disabled = false;

    message.textContent =
      `${project.title} selected. ` +
      "Press Load Project to open it.";
  }

  function unloadProject(showMessage = true) {
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
    unloadProject(false);

    activeProjectId = projectId;
    activeProjectUrl = project.page;

    activeTitle.textContent = project.title;
    activeType.textContent = project.type;
    activeRepo.href = project.repo;

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

  projectSelect.addEventListener("change", () => {
    const project = selectedProject();

    if (project) {
      displaySelection(project);
    } else {
      clearSelection();
    }
  });

  loadButton.addEventListener("click", () => {
    const id = selectedId();
    const project = selectedProject();

    if (!id || !project) {
      clearSelection();

      message.textContent =
        "Please select a project first.";

      return;
    }

    if (activeProjectId === id) {
      message.textContent =
        `${project.title} is already loaded.`;

      viewer.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      return;
    }

    loadProject(id, project);
  });

  closeButton.addEventListener("click", () => {
    unloadProject(true);
  });

  fullscreenButton.addEventListener(
    "click",
    () => {
      if (!activeProjectUrl) {
        message.textContent =
          "Load a project before opening it " +
          "in a new tab.";

        return;
      }

      const opened = window.open(
        activeProjectUrl,
        "_blank",
        "noopener,noreferrer"
      );

      if (!opened) {
        message.textContent =
          "Your browser blocked the new tab. " +
          "Allow pop-ups and try again.";
      }
    }
  );

  mobileMenuButton.addEventListener(
    "click",
    () => {
      const open =
        navLinks.classList.toggle("open");

      mobileMenuButton.setAttribute(
        "aria-expanded",
        open.toString()
      );

      mobileMenuButton.textContent =
        open ? "Close" : "Menu";
    }
  );

  navLinks
    .querySelectorAll("a")
    .forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");

        mobileMenuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        mobileMenuButton.textContent = "Menu";
      });
    });

  if (
    contactForm &&
    contactSubmitButton &&
    contactStatus
  ) {
    contactForm.addEventListener(
      "submit",
      async (event) => {
        event.preventDefault();

        contactSubmitButton.disabled = true;

        contactSubmitButton.textContent =
          "Sending...";

        contactStatus.className =
          "contact-status";

        contactStatus.textContent =
          "Sending your message...";

        try {
          const response = await fetch(
            contactForm.action,
            {
              method: "POST",
              body: new FormData(contactForm),

              headers: {
                Accept: "application/json"
              }
            }
          );

          if (!response.ok) {
            const data = await response
              .json()
              .catch(() => null);

            const errorMessage =
              data?.errors
                ?.map((item) => item.message)
                .join(", ") ||
              "Form submission failed.";

            throw new Error(errorMessage);
          }

          contactForm.reset();

          contactStatus.className =
            "contact-status success";

          contactStatus.textContent =
            "Your message was sent successfully.";
        } catch (error) {
          console.error(error);

          contactStatus.className =
            "contact-status error";

          contactStatus.textContent =
            "The message could not be sent. " +
            "Please try again or use the email link.";
        } finally {
          contactSubmitButton.disabled = false;

          contactSubmitButton.textContent =
            "Send Message";
        }
      }
    );
  }

  window.addEventListener(
    "beforeunload",
    () => {
      frame.src = "about:blank";
    }
  );

  clearSelection();
  unloadProject(false);
});
