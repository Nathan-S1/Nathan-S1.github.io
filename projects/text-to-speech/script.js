const textInput = document.querySelector("#text");
const voiceSelect = document.querySelector("#voice");
const rateInput = document.querySelector("#rate");
const pitchInput = document.querySelector("#pitch");
const rateOutput = document.querySelector("#rate-output");
const pitchOutput = document.querySelector("#pitch-output");
const status = document.querySelector("#status");

let voices = [];

function loadVoices() {
  voices = speechSynthesis.getVoices();
  voiceSelect.innerHTML = "";

  if (voices.length === 0) {
    const option = document.createElement("option");
    option.textContent = "Default browser voice";
    option.value = "";
    voiceSelect.append(option);
    return;
  }

  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = `${voice.name} (${voice.lang})${voice.default ? " — default" : ""}`;
    voiceSelect.append(option);
  });

  const englishIndex = voices.findIndex(voice => voice.lang.toLowerCase().startsWith("en"));
  if (englishIndex >= 0) voiceSelect.value = String(englishIndex);
}

function speak() {
  const text = textInput.value.trim();
  if (!text) {
    status.textContent = "Enter some text first.";
    return;
  }

  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const selected = voices[Number(voiceSelect.value)];
  if (selected) utterance.voice = selected;
  utterance.rate = Number(rateInput.value);
  utterance.pitch = Number(pitchInput.value);
  utterance.onstart = () => { status.textContent = "Speaking…"; };
  utterance.onend = () => { status.textContent = "Finished."; };
  utterance.onerror = event => { status.textContent = `Speech error: ${event.error}`; };
  speechSynthesis.speak(utterance);
}

rateInput.addEventListener("input", () => {
  rateOutput.textContent = `${Number(rateInput.value).toFixed(1)}×`;
});
pitchInput.addEventListener("input", () => {
  pitchOutput.textContent = Number(pitchInput.value).toFixed(1);
});
document.querySelector("#speak").addEventListener("click", speak);
document.querySelector("#pause").addEventListener("click", () => {
  speechSynthesis.pause();
  status.textContent = "Paused.";
});
document.querySelector("#resume").addEventListener("click", () => {
  speechSynthesis.resume();
  status.textContent = "Resumed.";
});
document.querySelector("#stop").addEventListener("click", () => {
  speechSynthesis.cancel();
  status.textContent = "Stopped.";
});

speechSynthesis.addEventListener?.("voiceschanged", loadVoices);
window.speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();
