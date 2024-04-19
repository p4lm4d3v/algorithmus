const nextEl = document.querySelector(".next");
const prevEl = document.querySelector(".prev");

const imgsEl = document.querySelectorAll("img");
const imageContainerEl = document.querySelector(".image-container");

let currImg = 1;
let currIndex = 0;

nextEl.addEventListener("click", () => {
  currImg++;
  index = (currImg - 1 + imgsEl.length) % imgsEl.length;
  updateImg();
});

prevEl.addEventListener("click", () => {
  currImg--;
  index = (currImg - 1 + imgsEl.length) % imgsEl.length;
  updateImg();
});

function updateImg() {
  imageContainerEl.style.transform =
    "translateX(calc(" + index + "  * -500px))";
  setTimeout(() => {
    currImg++;
    updateImg();
  }, 3000);
}

updateImg();
