const boxes = document.querySelectorAll("#boxes .box");
const mineCount = document.querySelector("#mineCount");
const timeCount = document.querySelector("#timeCount");
const resetBtn = document.querySelector("#reset-btn");
const startGame = document.querySelector("#startGame");
const resetGameOver = document.querySelector("#resetGameOver");
const resetGameWin = document.querySelector("#resetGameWin");

const startModal = document.querySelector(".start-modal");
const gameOverModal = document.querySelector(".game-over-modal");
const youWinModal = document.querySelector(".you-win-modal");

let int = null;
let seconds = 0;
let mines = [];
let openNumbersCount = 0;

startGame.addEventListener("click", () => {
  startModal.classList.add("start-modal-hidden");
  setMines();
  setMinesCount();
  showFlag();
});

resetBtn.addEventListener("click", resetGame);
resetGameOver.addEventListener("click", resetGame);
resetGameWin.addEventListener("click", resetGame);

function resetGame() {
  document.location.reload(true);
}

boxes.forEach((box) =>
  box.addEventListener("click", () => {
    startTime();
  })
);

function startTime() {
  if (int !== null) {
    clearInterval(int);
  }
  int = setInterval(countSecond, 1000);

  function countSecond() {
    seconds++;

    if (seconds == 999) {
      seconds = 0;
    }

    let s =
      seconds >= 100
        ? "" + seconds
        : seconds >= 10
        ? "0" + seconds
        : "00" + seconds;

    timeCount.innerHTML = s;
  }
}

function setMines() {
  for (let i = 0; i < boxes.length; i++) {
    let randomMine = Math.round(Math.random() * 3) == 0;
    mines.push(randomMine);
  }
  return mines;
}

function findMinesCount() {
  let count = 0;
  for (i of mines) {
    if (i) {
      count++;
    }
  }

  let c = count >= 20 ? "" + count : count >= 10 ? "0" + count : "00" + count;

  mineCount.innerHTML = c;

  return count;
}

function setMinesCount() {
  let count;
  let minesCountArr = [];
  for (let i = 0; i < boxes.length; i++) {
    count = false;
    if (!mines[i]) {
      count = 0;
      for (let j = 1; j <= 6; j++) {
        if (j != 2 && j != 3) {
          if (i % 5 == 0) {
            if (j != 6 && j != 1) {
              if (mines[i - j]) {
                count++;
              }
            }
            if (j != 4) {
              if (mines[i + j]) {
                count++;
              }
            }
          } else if (i % 5 == 4) {
            if (j != 4) {
              if (mines[i - j]) {
                count++;
              }
            }

            if (j != 1 && j != 6) {
              if (mines[i + j]) {
                count++;
              }
            }
          } else {
            if (mines[i - j]) {
              count++;
            }

            if (mines[i + j]) {
              count++;
            }
          }
        }
      }
    }
    minesCountArr.push(count);
  }
  stickClickBox(minesCountArr);
}

function stickClickBox(minesCountArr) {
  for (let i = 0; i < boxes.length; i++) {
    let box = boxes[i];
    let minesCount = findMinesCount();

    box.addEventListener("click", (e) => {
      if (minesCountArr[i] === false) {
        showAllMines(minesCountArr);
        setTimeout(() => {
          gameOverModal.classList.remove("game-over-modal-hidden");
        }, 500);
      } else if (minesCountArr[i] !== 0) {
        e.target.innerHTML = minesCountArr[i];
        e.target.classList.add("open-number");
        showAllZeros(minesCountArr);
        console.log(openNumbersCount++);
        if (openNumbersCount == 25 - minesCount - showAllZeros(minesCountArr)) {
          setTimeout(() => {
            youWinModal.classList.remove("you-win-modal-hidden");
          }, 500);
        }
      }
    });
  }
}

function showFlag() {
  boxes.forEach((box) => {
    box.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      box.innerHTML = "🚩";
    });
  });
}

function showAllMines(minesCount) {
  for (let i = 0; i < boxes.length; i++) {
    if (minesCount[i] === false) {
      boxes[
        i
      ].innerHTML = `<ion-icon class="open-mine" name="settings-sharp"></ion-icon>`;
    }
  }
}

function showAllZeros(minesCount) {
  let zeroCount = 0;
  for (let i = 0; i < boxes.length; i++) {
    if (minesCount[i] === 0) {
      zeroCount++;
      boxes[i].classList.add("open-zero");
    }
  }
  return zeroCount;
}
