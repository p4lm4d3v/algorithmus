const questionEl = document.getElementById("question");
const formEl = document.getElementById("form");
const inputEl = document.getElementById("input");
const scoreEl = document.getElementById("score");
const restartBtnEl = document.getElementById("restart");

const n1 = Math.ceil(Math.random() * 10);
const n2 = Math.ceil(Math.random() * 10);
const correctAns = n1 * n2;

let score = JSON.parse(localStorage.getItem("score"));
scoreEl.innerText = "score: " + score;

if (!score) score = 0;

questionEl.innerText = "What is " + n1 + " x " + n2 + "?";
formEl.addEventListener("submit", () => {
  const userAns = +inputEl.value;
  if (userAns == correctAns) {
    score++;
  } else {
    score--;
  }
  updateLocalStrorage();
});

restartBtnEl.addEventListener("click", () => {
  localStorage.removeItem("score");
  scoreEl.innerText = "score: 0";
});

function updateLocalStrorage() {
  localStorage.setItem("score", JSON.stringify(score));
}
