const cells = document.querySelectorAll('.cell');
const statement = document.getElementById('statement');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winningConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute('cellindex') || cell.getAttribute('data-cell-index');

  if (gameState[index] !== "" || !isGameActive) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    statement.textContent = `${currentPlayer} wins!`;
    isGameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statement.textContent = "It's a draw!";
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statement.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  currentPlayer = 'X';
  cells.forEach(cell => cell.textContent = "");
  statement.textContent = `${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

statement.textContent = `${currentPlayer}'s turn`;
