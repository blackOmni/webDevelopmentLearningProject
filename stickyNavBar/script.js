// Select the button element
const themeToggleBtn = document.getElementById("theme-toggle");

// Listen for a click event
themeToggleBtn.addEventListener("click", () => {
  // Toggle the .dark-theme class on the body element
  document.body.classList.toggle("dark-theme");

  // Update the button icon based on the current theme
  if (document.body.classList.contains("dark-theme")) {
    themeToggleBtn.textContent = "☀️"; // Sun icon for light mode option
  } else {
    themeToggleBtn.textContent = "🌙"; // Moon icon for dark mode option
  }
});
