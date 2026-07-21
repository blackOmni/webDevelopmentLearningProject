// --- 1. Real-time Character Counter Logic ---
const textareaEl = document.getElementById("textarea");
const totalCounterEl = document.getElementById("total-counter");
const remainingCounterEl = document.getElementById("remaining-counter");

textareaEl.addEventListener("input", updateCounter);

function updateCounter() {
  const maxLength = textareaEl.getAttribute("maxlength") || 500;
  const currentLength = textareaEl.value.length;

  totalCounterEl.innerText = currentLength;
  remainingCounterEl.innerText = maxLength - currentLength;
}

updateCounter();

// --- 2. Unified Ripple Mouse Effect Logic ---
const interactiveEls = document.querySelectorAll(".btn, .link a");

interactiveEls.forEach((el) => {
  el.addEventListener("mouseover", (event) => {
    const x = event.offsetX;
    const y = event.offsetY;

    el.style.setProperty("--xPos", x + "px");
    el.style.setProperty("--yPos", y + "px");
  });
});

// --- 3. Light / Dark Theme Toggle Logic ---
const themeBtn = document.getElementById("theme-btn");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});
