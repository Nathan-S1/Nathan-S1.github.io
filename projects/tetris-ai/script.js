const ROWS = 20;
const COLS = 10;
const CELL = 26;
const COLORS = ["#00e5ff", "#ffef58", "#b968e6", "#43e081", "#ff5b67", "#5577ff", "#ffa43b"];
const SHAPES = [
  [[1, 1, 1, 1]],
  [[1, 1], [1, 1]],
  [[0, 1, 0], [1, 1, 1]],
  [[0, 1, 1], [1, 1, 0]],
  [[1, 1, 0], [0, 1, 1]],
  [[1, 0, 0], [1, 1, 1]],
  [[0, 0, 1], [1, 1, 1]],
];

const ROTATIONS = SHAPES.map(allRotations);

const canvas = document.querySelector("#game");
const context = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const resetButton = document.querySelector("#reset");
const modeSelect = document.querySelector("#mode");
const pieceCapInput = document.querySelector("#piece-cap");
const message = document.querySelector("#message");
const pythonStatus = document.querySelector("#python-status");
const pythonLight = document.querySelector("#python-light");

let pyodide = null;
let bestMoveFunction = null;
let board = emptyBoard();
let bag = [];
let activePiece = null;
let score = 0;
let lines = 0;
let level = 0;
let pieces = 0;
let running = false;
let paused = false;
let timer = null;

function rotate(shape) {
  return shape[0].map((_, index) => shape.map(row => row[index]).reverse());
}

function allRotations(shape) {
  const rotations = [];
  let current = shape;
  for (let count = 0; count < 4; count += 1) {
    const serialized = JSON.stringify(current);
    if (!rotations.some(item => JSON.stringify(item) === serialized)) {
      rotations.push(current);
    }
    current = rotate(current);
  }
  return rotations;
}

function emptyBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

function collision(shape, x, y) {
  for (let row = 0; row < shape.length; row += 1) {
    for (let column = 0; column < shape[row].length; column += 1) {
      if (!shape[row][column]) continue;
      const boardX = x + column;
      const boardY = y + row;
      if (boardX < 0 || boardX >= COLS || boardY >= ROWS) return true;
      if (boardY >= 0 && board[boardY][boardX]) return true;
    }
  }
  return false;
}

function nextPieceIndex() {
  if (bag.length === 0) {
    bag = [0, 1, 2, 3, 4, 5, 6];
    for (let index = bag.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [bag[index], bag[randomIndex]] = [bag[randomIndex], bag[index]];
    }
  }
  return bag.pop();
}

function mergeActivePiece() {
  const shape = ROTATIONS[activePiece.index][activePiece.rotation];
  for (let row = 0; row < shape.length; row += 1) {
    for (let column = 0; column < shape[row].length; column += 1) {
      if (!shape[row][column]) continue;
      const y = activePiece.y + row;
      const x = activePiece.x + column;
      if (y < 0) {
        gameOver();
        return false;
      }
      board[y][x] = activePiece.index + 1;
    }
  }
  return true;
}

function clearLines() {
  const remaining = board.filter(row => row.some(cell => cell === 0));
  const cleared = ROWS - remaining.length;
  while (remaining.length < ROWS) remaining.unshift(Array(COLS).fill(0));
  board = remaining;

  if (cleared > 0) {
    const points = [0, 100, 300, 500, 800][cleared] || cleared * 250;
    score += points * (level + 1);
    lines += cleared;
    level = Math.floor(lines / 10);
  }
}

function updateStats() {
  document.querySelector("#score").textContent = score;
  document.querySelector("#lines").textContent = lines;
  document.querySelector("#level").textContent = level;
  document.querySelector("#pieces").textContent = pieces;
}

function drawCell(x, y, color) {
  context.fillStyle = color;
  context.fillRect(x * CELL, y * CELL, CELL, CELL);
  context.strokeStyle = "rgba(0, 0, 0, .35)";
  context.strokeRect(x * CELL + .5, y * CELL + .5, CELL - 1, CELL - 1);
}

function draw() {
  context.fillStyle = "#11151f";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.strokeStyle = "rgba(255,255,255,.045)";
  for (let x = 0; x <= COLS; x += 1) {
    context.beginPath();
    context.moveTo(x * CELL, 0);
    context.lineTo(x * CELL, canvas.height);
    context.stroke();
  }
  for (let y = 0; y <= ROWS; y += 1) {
    context.beginPath();
    context.moveTo(0, y * CELL);
    context.lineTo(canvas.width, y * CELL);
    context.stroke();
  }

  board.forEach((row, y) => row.forEach((cell, x) => {
    if (cell) drawCell(x, y, COLORS[(cell - 1) % COLORS.length]);
  }));

  if (activePiece) {
    const shape = ROTATIONS[activePiece.index][activePiece.rotation];
    shape.forEach((row, rowIndex) => row.forEach((cell, columnIndex) => {
      const y = activePiece.y + rowIndex;
      if (cell && y >= 0) {
        drawCell(activePiece.x + columnIndex, y, COLORS[activePiece.index]);
      }
    }));
  }
}

async function chooseMove(index) {
  const resultText = bestMoveFunction(JSON.stringify(board), index);
  return JSON.parse(resultText);
}

async function spawnPiece() {
  const cap = Math.max(1, Number(pieceCapInput.value) || 250);
  if (pieces >= cap) {
    stopGame(`Completed the selected ${cap}-piece run.`);
    return;
  }

  const index = nextPieceIndex();
  const move = await chooseMove(index);
  if (!move) {
    gameOver();
    return;
  }

  activePiece = {
    index,
    rotation: move.rotation,
    x: move.x,
    y: -2,
    targetY: move.y,
  };
  pieces += 1;
  updateStats();
  draw();

  if (modeSelect.value === "fast") {
    activePiece.y = activePiece.targetY;
    draw();
    schedule(lockPiece, Math.max(50, 150 - level * 5));
  } else {
    schedule(dropStep, Math.max(45, 230 - level * 12));
  }
}

function dropStep() {
  if (!running || paused || !activePiece) return;
  if (activePiece.y < activePiece.targetY) {
    activePiece.y += 1;
    draw();
    schedule(dropStep, Math.max(35, 180 - level * 10));
  } else {
    lockPiece();
  }
}

function lockPiece() {
  if (!running || paused || !activePiece) return;
  if (!mergeActivePiece()) return;
  clearLines();
  activePiece = null;
  updateStats();
  draw();
  schedule(spawnPiece, modeSelect.value === "fast" ? 65 : 120);
}

function schedule(callback, delay) {
  clearTimeout(timer);
  timer = setTimeout(callback, delay);
}

function startGame() {
  if (!pyodide) return;
  if (running && paused) {
    paused = false;
    pauseButton.textContent = "Pause";
    message.textContent = "AI resumed.";
    if (activePiece) {
      if (modeSelect.value === "fast") schedule(lockPiece, 80);
      else schedule(dropStep, 80);
    } else {
      schedule(spawnPiece, 80);
    }
    return;
  }
  if (running) return;

  running = true;
  paused = false;
  startButton.disabled = true;
  pauseButton.disabled = false;
  modeSelect.disabled = true;
  pieceCapInput.disabled = true;
  message.textContent = "The Python AI is choosing moves.";
  spawnPiece().catch(handleRuntimeError);
}

function togglePause() {
  if (!running) return;
  paused = !paused;
  clearTimeout(timer);
  pauseButton.textContent = paused ? "Resume" : "Pause";
  startButton.disabled = !paused;
  message.textContent = paused ? "Paused." : "AI resumed.";
  if (!paused) startGame();
}

function stopGame(text) {
  running = false;
  paused = false;
  clearTimeout(timer);
  startButton.disabled = false;
  pauseButton.disabled = true;
  pauseButton.textContent = "Pause";
  modeSelect.disabled = false;
  pieceCapInput.disabled = false;
  message.textContent = text;
}

function gameOver() {
  stopGame("Game over. Press Reset to try another run.");
}

function resetGame() {
  stopGame("Board reset.");
  board = emptyBoard();
  bag = [];
  activePiece = null;
  score = 0;
  lines = 0;
  level = 0;
  pieces = 0;
  updateStats();
  draw();
}

function handleRuntimeError(error) {
  console.error(error);
  stopGame("The game stopped because of an unexpected error.");
}

async function initializePython() {
  try {
    pyodide = await loadPyodide();
    const response = await fetch("tetris_ai.py");
    if (!response.ok) throw new Error(`Could not load tetris_ai.py (${response.status})`);
    await pyodide.runPythonAsync(await response.text());
    bestMoveFunction = pyodide.globals.get("best_move_json");
    pythonStatus.textContent = "Python AI ready";
    pythonLight.classList.add("ready");
    startButton.disabled = false;
    message.textContent = "Select a mode and start the AI.";
  } catch (error) {
    console.error(error);
    pythonStatus.textContent = "Python failed to load";
    pythonLight.classList.add("error");
    message.textContent = "Serve this folder through GitHub Pages or a local web server. Opening index.html directly will not load Python.";
  }
}

startButton.addEventListener("click", startGame);
pauseButton.addEventListener("click", togglePause);
resetButton.addEventListener("click", resetGame);
draw();
updateStats();
initializePython();
