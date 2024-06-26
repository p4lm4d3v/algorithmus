const bodyEl = document.querySelector("body");

let index = 1;

bodyEl.addEventListener("mousemove", (event) => {
  if (index % 3 == 0) {
    const xPos = event.offsetX;
    const yPos = event.offsetY;
    const spanEl = document.createElement("span");
    spanEl.style.left = xPos + "px";
    spanEl.style.top = yPos + "px";
    const size = Math.random() * 50 + 50;
    spanEl.style.width = size + "px";
    spanEl.style.height = size + "px";
    bodyEl.appendChild(spanEl);
    setTimeout(() => {
      spanEl.remove();
    }, 3000);
    index = 1;
  }
  index++;
});
