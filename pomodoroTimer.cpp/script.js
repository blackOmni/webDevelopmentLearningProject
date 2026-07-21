// DOM Elements
const timerForm = document.getElementById("timerForm");
const timerContainer = document.getElementById("timerContainer");
const timerDisplay = document.getElementById("timerDisplay");
const mainContainer = document.querySelector(".main-container");
const modeSelectors = document.getElementById("modeSelectors");
const themeToggle = document.getElementById("themeToggle");

// Mode Triggers
const hoursSetToggle = document.getElementById("hoursSetToggle");
const minSetToggle = document.getElementById("minSetToggle");

// Inputs
const setupHours = document.getElementById("setupHours");
const setupMinutes = document.getElementById("setupMinutes");
const setupSeconds = document.getElementById("setupSeconds");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const restartBtn = document.getElementById("restartBtn");
const resetBtn = document.getElementById("resetBtn");

// System variables
let countdownInterval = null;
let configuredDuration = 25 * 60;
let timeRemaining = configuredDuration;
let isRunning = false;
let currentMode = "minutes";

// --- Theme Toggle Logic ---
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "dark") {
    document.documentElement.removeAttribute("data-theme"); // Defaults back to CSS dark scheme
    themeToggle.textContent = `🌑`;
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.textContent = `☀️`;
  }
});

// Checkbox Sync
hoursSetToggle.addEventListener("change", () => {
  if (hoursSetToggle.checked) {
    minSetToggle.checked = false;
    currentMode = "hours";
    mainContainer.classList.remove("hide-hours");
  } else {
    hoursSetToggle.checked = true;
  }
  updateDisplay(timeRemaining);
});

minSetToggle.addEventListener("change", () => {
  if (minSetToggle.checked) {
    hoursSetToggle.checked = false;
    currentMode = "minutes";
    mainContainer.classList.add("hide-hours");
  } else {
    minSetToggle.checked = true;
  }
  updateDisplay(timeRemaining);
});

// Calculate and generate current clock string
function updateDisplay(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedMM = minutes.toString().padStart(2, "0");
  const formattedSS = seconds.toString().padStart(2, "0");

  if (currentMode === "hours") {
    const formattedHH = hours.toString().padStart(2, "0");
    timerDisplay.textContent = `${formattedHH}:${formattedMM}:${formattedSS}`;
  } else {
    const absoluteMinutes = Math.floor(totalSeconds / 60);
    const formattedAbsMM = absoluteMinutes.toString().padStart(2, "0");
    timerDisplay.textContent = `${formattedAbsMM}:${formattedSS}`;
  }
}

// Runtime controls logic
function startTimer() {
  if (isRunning) return;

  isRunning = true;
  countdownInterval = setInterval(() => {
    if (timeRemaining > 0) {
      timeRemaining--;
      updateDisplay(timeRemaining);
    } else {
      clearInterval(countdownInterval);
      isRunning = false;
      alert("Time's up!");
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(countdownInterval);
  isRunning = false;
}

function restartTimer() {
  stopTimer();
  timeRemaining = configuredDuration;
  updateDisplay(timeRemaining);
  startTimer();
}

function resetToSetupForm() {
  stopTimer();

  timerForm.classList.remove("hidden");
  modeSelectors.classList.remove("hidden");
  timerContainer.classList.add("hidden");

  setupHours.value = "00";
  setupMinutes.value = "25";
  setupSeconds.value = "00";
}

// Form Submissions
timerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const hrs = currentMode === "hours" ? parseInt(setupHours.value) || 0 : 0;
  const mins = parseInt(setupMinutes.value) || 0;
  const secs = parseInt(setupSeconds.value) || 0;

  configuredDuration = hrs * 3600 + mins * 60 + secs;

  if (configuredDuration <= 0) {
    alert("Please enter a valid time greater than 0 seconds!");
    return;
  }

  timeRemaining = configuredDuration;
  updateDisplay(timeRemaining);

  timerForm.classList.add("hidden");
  modeSelectors.classList.add("hidden");
  timerContainer.classList.remove("hidden");

  startTimer();
});

// Operational Hooks
startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
restartBtn.addEventListener("click", restartTimer);
resetBtn.addEventListener("click", resetToSetupForm);
