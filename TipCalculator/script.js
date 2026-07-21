let currentTotal = 0;

const currencySelect = document.getElementById("currencySelect");
const totalDisplay = document.getElementById("totalDisplay");
const billSign = document.getElementById("billSign");

function calculateValue() {
  const billValue = +document.getElementById("billAmount").value;
  const tipPercentValue = +document.getElementById("tipPercentage").value;

  if (
    isNaN(billValue) ||
    isNaN(tipPercentValue) ||
    billValue < 0 ||
    tipPercentValue < 0
  ) {
    currentTotal = 0;
    return;
  }

  const tipAmount = billValue * (tipPercentValue / 100);
  currentTotal = billValue + tipAmount; // Saves answer numerically
}

function updateCurrencyUi() {
  const selectedSymbol = currencySelect.value;

  billSign.textContent = selectedSymbol;

  totalDisplay.textContent = `${selectedSymbol}${currentTotal.toFixed(2)}`;
}

document.getElementById("tipForm").addEventListener("submit", function (event) {
  event.preventDefault();
  calculateValue();
  updateCurrencyUi();
});

currencySelect.addEventListener("change", function () {
  updateCurrencyUi();
});

document.getElementById("tipForm").addEventListener("reset", function () {
  currentTotal = 0;
  setTimeout(() => {
    updateCurrencyUi();
  }, 0);
});
