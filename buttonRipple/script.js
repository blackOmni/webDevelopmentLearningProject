const btnEl = document.querySelector(".btn");

btnEl.addEventListener("mouseenter", (event) => {
  // Get the exact position of the button relative to the viewport
  const rect = btnEl.getBoundingClientRect();

  // Calculate the cursor position relative strictly to the button
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Update the CSS variables
  btnEl.style.setProperty("--xPos", x + "px");
  btnEl.style.setProperty("--yPos", y + "px");
});
