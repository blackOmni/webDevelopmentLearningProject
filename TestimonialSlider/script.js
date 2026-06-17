// Collect array collections and controller click actions
const slides = document.querySelectorAll(".slider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0; // Tracking pointer for current visible card

function updateSlider(newIndex) {
  // 1. Remove active state from the current slide
  slides[currentIndex].classList.remove("active");

  // 2. Set index boundaries (loop around if edge thresholds are breached)
  if (newIndex >= slides.length) {
    currentIndex = 0; // Jump back to first card
  } else if (newIndex < 0) {
    currentIndex = slides.length - 1; // Jump back to final card
  } else {
    currentIndex = newIndex;
  }

  // 3. Inject active layout configuration to target view selection
  slides[currentIndex].classList.add("active");
}

// Event Listeners for navigational inputs
nextBtn.addEventListener("click", function () {
  updateSlider(currentIndex + 1);
});

prevBtn.addEventListener("click", function () {
  updateSlider(currentIndex - 1);
});
