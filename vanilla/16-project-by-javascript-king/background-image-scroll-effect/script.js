const bgImageEl = document.getElementById("bg-image");

window.addEventListener("scroll", () => {
  updateImage();
});

function updateImage() {
  const val = Math.round((1 - window.pageYOffset / 800) * 100) / 100;
  bgImageEl.style.opacity = val <= 0.1 ? 0 : val;
  console.log(Math.round(window.pageYOffset * 100) / 100, val);
}
