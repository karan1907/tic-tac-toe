const squares = document.querySelectorAll(".square");
const restart = document.getElementById("restart");
const winningMessage = document.querySelector("h1");
const overlay = document.querySelector(".overlay");
const CIRCLE = "circle";
const CROSS = "cross";
let circleTurn;

const winningLogic = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
function cross() {
  return `<svg width="100" height="100" viewBox="-50 -50 100 100" class="cross">
      <line x1="-40" y1="-40" x2="40" y2="40" />
      <line x1="40" y1="-40" x2="-40" y2="40" />
    </svg>`;
}

function circle() {
  return `<svg width="100" height="100" viewBox="-50 -50 100 100" class="circle">
      <circle cx="0" cy="0" r="40" />
    </svg>`;
}

startGame();

restart.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  squares.forEach(square => {
    square.classList.remove(CROSS);
    square.classList.remove(CIRCLE);
    square.innerHTML = "";
    square.removeEventListener("click", handleClick);
    square.addEventListener("click", handleClick, { once: true });
  });
  overlay.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? circle() : cross();
  const parentClass = circleTurn ? CIRCLE : CROSS;
  placeMark(cell, currentClass, parentClass);
  // Check for win
  if (checkWin(parentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
  // Check for draw
  // Switch Turns
}
function endGame(draw) {
  if (draw) {
    winningMessage.innerText = "Draw!";
  } else {
    winningMessage.innerText = `${circleTurn ? "O" : "X"} Wins!`;
  }
  overlay.classList.add("show");
}
function isDraw() {
  return [...squares].every(cell => {
    return cell.classList.contains(CROSS) || cell.classList.contains(CIRCLE);
  });
}
function placeMark(cell, currentClass, parentClass) {
  cell.innerHTML = currentClass;
  cell.classList.add(parentClass);
}
function swapTurns() {
  circleTurn = !circleTurn;
}
function checkWin(parentClass) {
  return winningLogic.some(combination => {
    return combination.every(index => {
      return squares[index].classList.contains(parentClass);
    });
  });
}
