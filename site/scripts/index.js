const vanillaContainer = document.querySelector(".vanilla-container");
const p5jsContainer = document.querySelector(".p5js-container");
const processingContainer = document.querySelector(".processing-container");

vanillaContainer.addEventListener("click", () => {
  window.location = "site/pages/vanilla/vanilla.html";
});

p5jsContainer.addEventListener("click", () => {
  window.location = "site/pages/p5js/p5js.html";
});

processingContainer.addEventListener("click", () => {
  window.location = "site/pages/processing/processing.html";
});
