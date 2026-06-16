// 1. Target all three input boxes from your HTML layout
const celsius = document.getElementById("celsius");
const fahrenheit = document.getElementById("fahrenheit");
const kelvin = document.getElementById("kelvin");
const tempForm = document.getElementById("tempForm");

// 2. CASE 1: When the user types or changes the Celsius box
celsius.addEventListener("input", function () {
  if (celsius.value === "") {
    clearAll();
    return;
  }

  const c = +celsius.value; // Convert text input directly to a number
  fahrenheit.value = ((c * 9) / 5 + 32).toFixed(2); // Updates Fahrenheit
  kelvin.value = (c + 273.15).toFixed(2); // Updates Kelvin
});

// 3. CASE 2: When the user types or changes the Fahrenheit box
fahrenheit.addEventListener("input", function () {
  if (fahrenheit.value === "") {
    clearAll();
    return;
  }

  const f = +fahrenheit.value;
  const c = ((f - 32) * 5) / 9; // Find Celsius first to simplify formulas
  celsius.value = c.toFixed(2); // Updates Celsius
  kelvin.value = (c + 273.15).toFixed(2); // Updates Kelvin
});

// 4. CASE 3: When the user types or changes the Kelvin box
kelvin.addEventListener("input", function () {
  if (kelvin.value === "") {
    clearAll();
    return;
  }

  const k = +kelvin.value;
  const c = k - 273.15; // Find Celsius first to simplify formulas
  celsius.value = c.toFixed(2); // Updates Celsius
  fahrenheit.value = ((c * 9) / 5 + 32).toFixed(2); // Updates Fahrenheit
});

// Helper Function: Blanks out every box if a user clears their active input
function clearAll() {
  celsius.value = "";
  fahrenheit.value = "";
  kelvin.value = "";
}

// 5. Clear display cleanly when the reset button is clicked
tempForm.addEventListener("reset", function () {
  setTimeout(clearAll, 0); // Waits for native browser wipe to finish first
});
