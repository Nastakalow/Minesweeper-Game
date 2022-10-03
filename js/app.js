const boxes = document.querySelectorAll("#boxes .box");
const flag = document.querySelector("#flag");
const mine = document.querySelector("#mine");
const flagCount = document.querySelector("#flagCount");
const timeCount = document.querySelector("#timeCount");
const resetBtn = document.querySelector("#reset-btn");

let int = null;
let seconds = 0;
let mines = [];

flag.addEventListener("click", switchFlag);
mine.addEventListener("click", switchMine);
resetBtn.addEventListener("click", resetGame);
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

function resetGame() {
  clearInterval(int);
  timeCount.innerHTML = "000";
}

function switchFlag() {
  flag.classList.add("active");
  mine.classList.remove("active");
}

function switchMine() {
  mine.classList.add("active");
  flag.classList.remove("active");
}

function setMines() {
  for (let i = 0; i < boxes.length; i++) {
    let randomMine = Math.round(Math.random()) == 1;
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
  flagCount.innerHTML = count;
}

function setMinesCount() {
  let count;
  let minesCount = [];
  for (let i = 0; i < boxes.length; i++) {
    count = 0;
    if (!mines[i]) {
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
            if (j != 4 && j != 1) {
              if (mines[i - j]) {
                count++;
              }
            }

            if (j != 6) {
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
      boxes[i].innerHTML = count;
      minesCount.push(count);
    }
  }
  return minesCount;
}

console.log(setMines());
console.log(setMinesCount());
console.log(findMinesCount());
