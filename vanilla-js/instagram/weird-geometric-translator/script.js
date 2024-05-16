const input = document.getElementById("input");
const output = document.getElementById("output");

input.addEventListener("input", function () {
  output.innerText = input.value.toUpperCase();
});
