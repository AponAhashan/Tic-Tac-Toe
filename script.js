const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restartBtn");
const resetScoreBtn = document.getElementById("resetScoreBtn");

const scoreXEl = document.getElementById("scoreX");
const scoreOEl = document.getElementById("scoreO");
const scoreDrawEl = document.getElementById("scoreDraw");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

let scores = {
  X: 0,
  O: 0,
  draw: 0
};

const winningConditions = [
  [0, 1, 2], // ১ম সারি
  [3, 4, 5], // ২য় সারি
  [6, 7, 8], // ৩য় সারি
  [0, 3, 6], // ১ম কলাম
  [1, 4, 7], // ২য় কলাম
  [2, 5, 8], // ৩য় কলাম
  [0, 4, 8], // প্রধান কর্ণ
  [2, 4, 6]  // বিপরীত কর্ণ
];

function handleCellClick(event) {
  const cell = event.target;
  const index = Number(cell.dataset.index);

  if (board[index] !== "" || !isGameActive) {
    return;
  }

  updateCell(cell, index);
  checkResult();
}

function updateCell(cell, index) {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());
  cell.disabled = true;
}

function checkResult() {
  let wonCombo = null;

  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      wonCombo = condition;
      break;
    }
  }

  if (wonCombo) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    isGameActive = false;
    scores[currentPlayer]++;
    updateScoreboard();
    highlightWinningCells(wonCombo);
    disableAllCells();
    return;
  }

  const isDraw = !board.includes("");
  if (isDraw) {
    statusText.textContent = "It's a Draw!";
    isGameActive = false;
    scores.draw++;
    updateScoreboard();
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function highlightWinningCells(combo) {
  combo.forEach((index) => {
    cells[index].classList.add("win");
  });
}

function disableAllCells() {
  cells.forEach((cell) => {
    cell.disabled = true;
  });
}

function updateScoreboard() {
  scoreXEl.textContent = scores.X;
  scoreOEl.textContent = scores.O;
  scoreDrawEl.textContent = scores.draw;
}

function restartRound() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.disabled = false;
    cell.classList.remove("x", "o", "win");
  });
}

function resetScore() {
  scores = { X: 0, O: 0, draw: 0 };
  updateScoreboard();
  restartRound();
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartRound);
resetScoreBtn.addEventListener("click", resetScore);