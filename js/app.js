// class MineSweeper {
//   qutular = document.querySelectorAll("#boxes .box");
//   minalar = [];
//   oyunBitib = false;

//   constructor() {
//     this.minalariDuz();
//     console.log(this.minalar);
//     this.minalarinSayiniGoster();
//     this.qutularaClickleriYapishdir();
//   }

//   minalariDuz() {
//     for (let i = 0; i < this.qutular.length; i++) {}
//   }
// }

const flag = document.querySelector("#flag");
const mine = document.querySelector("#mine");

flag.addEventListener("click", () => {
  flag.classList.add("active");
  mine.classList.remove("active");
});

mine.addEventListener("click", () => {
  mine.classList.add("active");
  flag.classList.remove("active");
});
