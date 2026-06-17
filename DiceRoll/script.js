// --- Document Elements References ---
const diceElements = document.querySelectorAll(".dice-value");
const rollButton = document.getElementById("roll-btn");
const historyContainer = document.getElementById("history-box");

// Multiplayer Setup Elements
const setupView = document.getElementById("setup-view");
const scoreView = document.getElementById("score-view");
const playerCountInput = document.getElementById("player-count");
const targetScoreInput = document.getElementById("target-score");
const startGameButton = document.getElementById("start-game-btn");
const turnAnnouncer = document.getElementById("turn-announcer");
const playersGrid = document.getElementById("players-grid");

// --- Game State Variables ---
let rollCount = 0;
let players = [];
let activePlayerIndex = 0;
let gameActive = false;
let winningScoreThreshold = 50;

// Disable rolling by default until players are configured
rollButton.disabled = true;

// --- Initialize Multiplayer Game ---
startGameButton.addEventListener("click", () => {
  const count = parseInt(playerCountInput.value, 10);
  const targetScore = parseInt(targetScoreInput.value, 10);

  // Validate inputs
  if (count < 2 || count > 6 || isNaN(count)) return;
  if (targetScore < 10 || isNaN(targetScore)) return;

  winningScoreThreshold = targetScore;
  players = [];

  for (let i = 1; i <= count; i++) {
    players.push({
      name: `P${i}`,
      score: 0,
    });
  }

  activePlayerIndex = 0;
  gameActive = true;

  // Update view visibility states
  setupView.classList.add("hidden");
  scoreView.classList.remove("hidden");
  rollButton.disabled = false;

  renderScoreboard();
  updateTurnDisplay();
});

// --- Scoreboard Render Engine ---
function renderScoreboard() {
  playersGrid.innerHTML = "";
  players.forEach((player, index) => {
    const card = document.createElement("div");
    card.className = `player-score-card ${index === activePlayerIndex ? "current-turn" : ""}`;
    card.innerHTML = `
      <div class="player-name">${player.name}</div>
      <div class="player-score">${player.score}</div>
    `;
    playersGrid.appendChild(card);
  });
}

function updateTurnDisplay() {
  if (!gameActive) return;
  turnAnnouncer.textContent = `${players[activePlayerIndex].name}'s Turn`;
}

// --- Random Integer Generator Function ---
function getRandomDiceValue() {
  return Math.floor(Math.random() * 6) + 1;
}

// --- Event Core Routine Management ---
rollButton.addEventListener("click", () => {
  if (!gameActive) return;

  rollButton.disabled = true;
  let localIntervalCounter = 0;

  const shuffleInterval = setInterval(() => {
    diceElements.forEach((el) => el.classList.remove("active"));

    const fakeRandomIndex = Math.floor(Math.random() * 6);
    diceElements[fakeRandomIndex].classList.add("active");
    diceElements[fakeRandomIndex].classList.add("shaking");

    localIntervalCounter++;

    if (localIntervalCounter > 10) {
      clearInterval(shuffleInterval);

      diceElements.forEach((el) => {
        el.classList.remove("active");
        el.classList.remove("shaking");
      });

      const finalizedRollValue = getRandomDiceValue();
      diceElements[finalizedRollValue - 1].classList.add("active");

      processTurnResult(finalizedRollValue);
    }
  }, 80);
});

// --- Core Turn Point Processing Engine ---
function processTurnResult(rollValue) {
  const currentPlayer = players[activePlayerIndex];

  currentPlayer.score += rollValue;

  // Update log container using the player card configuration
  updateHistoryLog(currentPlayer.name, rollValue);

  if (currentPlayer.score >= winningScoreThreshold) {
    gameActive = false;
    turnAnnouncer.innerHTML = `🏆 ${currentPlayer.name} Wins!`;
    renderScoreboard();
    return;
  }

  activePlayerIndex = (activePlayerIndex + 1) % players.length;

  renderScoreboard();
  updateTurnDisplay();

  rollButton.disabled = false;
}

// --- Square Box History Trace Generation ---
function updateHistoryLog(playerName, value) {
  rollCount++;

  const squareCard = document.createElement("div");
  squareCard.className = "history-box-card";

  squareCard.innerHTML = `
    <div class="card-roll-count">#${rollCount}</div>
    <div class="card-dice-score">${value}</div>
    <div class="card-player-assignment">${playerName}</div>
  `;

  historyContainer.prepend(squareCard);
}
