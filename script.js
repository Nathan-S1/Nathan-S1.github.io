const projects = {
  applepicker: {
    title: "Apple Picker",
    type: "Unity Game",
    description:
      "A Unity game where players control a basket to catch falling apples while avoiding rotten apples. Features dynamic spawning, scoring, and gameplay interactions.",
    repo: "https://github.com/Nathan-S1/ApplePicker",
    status: "Can run on this website after exporting the Unity project as a WebGL build.",
    demo: "projects/applepicker/index.html"
  },

  videogenerator: {
    title: "Video Generator",
    type: "Python / OpenCV / Multimedia",
    description:
      "A Python project that processes images and text to generate dynamic video content using OpenCV, PIL, and media processing tools.",
    repo: "https://github.com/Nathan-S1/VideoGenerator",
    status:
      "Requires Python or a hosted backend. For now, this can link to the GitHub repo or a recorded demo video.",
    demo: null
  },

  imagegenerator: {
    title: "Image Generator",
    type: "Python / Image Processing",
    description:
      "A Python-based image generation and manipulation project using libraries such as PIL and Matplotlib.",
    repo: "https://github.com/Nathan-S1/ImageGenerator",
    status:
      "Requires Python or a hosted backend. Later, this can become a browser demo or API-powered tool.",
    demo: null
  },

  speechsynthesis: {
    title: "Multilingual Speech Synthesis",
    type: "Python / Text-to-Speech",
    description:
      "A multilingual speech synthesis project using Python and text-to-speech tools such as gTTS.",
    repo: "https://github.com/Nathan-S1/MultilingualSpeechSynthesis",
    status:
      "Requires Python and speech synthesis dependencies. Later, this can connect to a hosted backend.",
    demo: null
  }
};

function showProject(projectId) {
  const project = projects[projectId];

  document.getElementById("selected-project-title").textContent = project.title;
  document.getElementById("selected-project-type").textContent = project.type;
  document.getElementById("selected-project-description").textContent = project.description;
  document.getElementById("selected-project-status").textContent = project.status;

  const repoLink = document.getElementById("selected-project-repo");
  repoLink.href = project.repo;
  repoLink.textContent = "View GitHub Repo";

  const demoLink = document.getElementById("selected-project-demo");

  if (project.demo) {
    demoLink.href = project.demo;
    demoLink.textContent = "Run Demo";
    demoLink.style.display = "inline-block";
  } else {
    demoLink.removeAttribute("href");
    demoLink.textContent = "Demo Coming Soon";
    demoLink.style.display = "inline-block";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  showProject("applepicker");
});
