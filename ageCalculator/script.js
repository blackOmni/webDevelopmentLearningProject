document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ageForm");
  const dobInput = document.getElementById("DateOfBirth");
  const resultDisplay = document.querySelector(".container-footer");

  // Handle Age Calculation
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const dobValue = dobInput.value;
    if (!dobValue) {
      resultDisplay.textContent = "Please select a date.";
      return;
    }

    const birthDate = new Date(dobValue);
    const today = new Date();

    birthDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (birthDate > today) {
      resultDisplay.textContent = "Date cannot be in the future!";
      return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += previousMonth.getDate();
      months--;
    }

    if (months < 0) {
      months += 12;
      years--;
    }

    if (years === 0 && months === 0 && days === 0) {
      resultDisplay.textContent = "Born today! Welcome!";
    } else {
      resultDisplay.textContent = `You are ${years} years, ${months} months, and ${days} days old`;
    }
  });

  // Automatically reset the text display when form is cleared
  form.addEventListener("reset", () => {
    resultDisplay.textContent = "Enter your age above";
  });
});
