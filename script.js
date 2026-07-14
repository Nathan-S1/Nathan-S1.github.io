"use strict";

const projects = {
  applepicker: {
    title: "Apple Picker",
    type: "Unity WebGL Game",

    description:
      "A Unity game where the player controls baskets to catch falling apples while managing score and gameplay interactions.",

    openUrl: "projects/applepicker/index.html",

    repoUrl:
      "https://github.com/Nathan-S1/ApplePicker",

    openLabel: "Play Apple Picker",

    notice:
      "The game opens only after this button is pressed. Your Unity WebGL files must be uploaded to projects/applepicker/."
  },

  videogenerator: {
    title: "Video Generator",
    type: "Python / Jupyter Notebook",

    description:
      "A Python multimedia project that processes images and text to create video content using OpenCV, Pillow, and related media-processing tools.",

    openUrl:
      "https://colab.research.google.com/github/Nathan-S1/VideoGenerator/blob/main/src/video_generator.ipynb",

    repoUrl:
      "https://github.com/Nathan-S1/VideoGenerator",

    openLabel: "Open Notebook in Colab",

    notice:
      "Google Colab opens the Jupyter notebook in a new tab. The visitor may need to run the notebook cells and install its dependencies."
  },

  imagegenerator: {
    title: "Image Generator",
    type: "Python / Jupyter Notebook",

    description:
      "A Python image-generation and image-manipulation project using Pillow and Matplotlib for filters, transformations, text overlays, and graphical elements.",

    openUrl:
      "https://colab.research.google.com/github/Nathan-S1/ImageGenerator/blob/main/src/image_generator.ipynb",

    repoUrl:
      "https://github.com/Nathan-S1/ImageGenerator",

    openLabel: "Open Notebook in Colab",

    notice:
      "Google Colab opens the Jupyter notebook in a new tab. The visitor may need to run the notebook cells and install its dependencies."
  },

  speechsynthesis: {
    title: "Multilingual Speech Synthesis",
    type: "Python Text-to-Speech Project",

    description:
      "A multilingual text-to-speech project using Python and gTTS to convert text into spoken audio in multiple languages.",

    openUrl:
      "https://github.com/Nathan-S1/MultilingualSpeechSynthesis",

    repoUrl:
      "https://github.com/Nathan-S1/MultilingualSpeechSynthesis",

    openLabel: "Open Project Files",

    notice:
      "This repository currently documents a Python script rather than a Jupyter notebook. It therefore opens the project repository instead of running directly on GitHub Pages."
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const projectSelect =
    document.getElementById("project-select");

  const projectDetails =
    document.getElementById("project-details");

  const projectType =
    document.getElementById("project-type");

  const projectTitle =
    document.getElementById("project-title");

  const projectDescription =
    document.getElementById("project-description");

  const projectNotice =
    document.getElementById("project-notice");

  const openProjectButton =
    document.getElementById("open-project-button");

  const viewRepoButton =
    document.getElementById("view-repo-button");

  const projectMessage =
    document.getElementById("project-message");

  const currentYear =
    document.getElementById("current-year");

  if (currentYear) {
    currentYear.textContent =
      new Date().getFullYear().toString();
  }

  function getSelectedProject() {
    const selectedId = projectSelect.value;

    if (!selectedId) {
      return null;
    }

    return projects[selectedId] ?? null;
  }

  function clearProjectSelection() {
    projectDetails.hidden = true;

    projectType.textContent = "";
    projectTitle.textContent = "";
    projectDescription.textContent = "";
    projectNotice.textContent = "";

    openProjectButton.textContent = "Open Project";
    openProjectButton.disabled = true;

    viewRepoButton.disabled = true;

    projectMessage.textContent =
      "Select a project to continue.";
  }

  function displaySelectedProject(project) {
    projectDetails.hidden = false;

    projectType.textContent = project.type;
    projectTitle.textContent = project.title;
    projectDescription.textContent =
      project.description;
    projectNotice.textContent = project.notice;

    openProjectButton.textContent =
      project.openLabel;

    openProjectButton.disabled = false;
    viewRepoButton.disabled = false;

    projectMessage.textContent =
      `${project.title} is ready. Press a button to continue.`;
  }

  function openExternalPage(url) {
    const openedWindow = window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );

    if (!openedWindow) {
      projectMessage.textContent =
        "Your browser blocked the new tab. Allow pop-ups for this website and try again.";
    }
  }

  projectSelect.addEventListener("change", () => {
    const project = getSelectedProject();

    if (!project) {
      clearProjectSelection();
      return;
    }

    displaySelectedProject(project);
  });

  openProjectButton.addEventListener("click", () => {
    const project = getSelectedProject();

    if (!project) {
      clearProjectSelection();
      projectMessage.textContent =
        "Please choose a project first.";
      return;
    }

    openExternalPage(project.openUrl);
  });

  viewRepoButton.addEventListener("click", () => {
    const project = getSelectedProject();

    if (!project) {
      clearProjectSelection();
      projectMessage.textContent =
        "Please choose a project first.";
      return;
    }

    openExternalPage(project.repoUrl);
  });

  clearProjectSelection();
});
