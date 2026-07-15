// Change these two values after placing the files in your GitHub repository.
const GITHUB_USERNAME = "Nathan-S1";
const GITHUB_REPOSITORY = "Nathan-S1.github.io";
const NOTEBOOK_PATH = "notebooks/video-generator.ipynb";
const BRANCH = "main";

const link = document.querySelector("#colab-link");
const status = document.querySelector("#status");

if (
  GITHUB_USERNAME === "YOUR_GITHUB_USERNAME" ||
  GITHUB_REPOSITORY === "YOUR_REPOSITORY"
) {
  link.addEventListener("click", event => event.preventDefault());
  status.textContent = "Edit script.js and enter your GitHub username and repository name first.";
} else {
  link.href = `https://colab.research.google.com/github/${GITHUB_USERNAME}/${GITHUB_REPOSITORY}/blob/${BRANCH}/${NOTEBOOK_PATH}`;
  status.textContent = "The notebook will open in a separate Google Colab tab.";
}
