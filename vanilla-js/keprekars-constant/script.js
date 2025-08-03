function hasFourDigits(number) {
  const numberStr = number.toString();
  return numberStr.length === 4;
}

function hasAtLeastTwoDifferentDigits(number) {
  const numberStr = number.toString();
  const uniqueDigits = new Set();
  for (const digit of numberStr) {
    uniqueDigits.add(digit);
    if (uniqueDigits.size >= 2) {
      return true;
    }
  }
  return false;
}

function isValid(number) {
  return hasFourDigits(number) && hasAtLeastTwoDifferentDigits(number);
}

function orderDigitsDescending(number) {
  const numberStr = number.toString();
  const digits = numberStr.split("");
  digits.sort((a, b) => b - a);
  const sortedNumberStr = digits.join("");
  return parseInt(sortedNumberStr, 10);
}

function orderDigitsAscending(number) {
  const numberStr = number.toString();
  const digits = numberStr.split("");
  digits.sort((a, b) => a - b);
  const sortedNumberStr = digits.join("");
  return parseInt(sortedNumberStr, 10);
}

class Calculation {
  constructor(number) {
    this.number = number;
    this.descending = orderDigitsDescending(number);
    this.ascending = orderDigitsAscending(number);
    this.result = this.descending - this.ascending;
  }
}

class InvalidCalculation {}

function calculateSteps(number) {
  if (!isValid(number)) return [new InvalidCalculation()];
  const steps = [];
  let step = new Calculation(number);
  steps.push(step);
  while (step.result !== 6174) {
    if (!isValid(number)) return steps;
    step = new Calculation(step.result);
    steps.push(step);
  }
  return steps;
}

function calculateAndDisplaySteps() {
  const numberInput = document.getElementById("number-input");
  const resultsContainer = document.getElementById("results");
  const number = parseInt(numberInput.value, 10);

  if (isNaN(number)) {
    resultsContainer.innerHTML =
      '<p class="error">Please enter a valid number.</p>';
    return;
  }

  const steps = calculateSteps(number);

  if (steps[0] instanceof InvalidCalculation) {
    resultsContainer.innerHTML =
      '<p class="error">Invalid number. Please enter a 4-digit number with at least two different digits.</p>';
    return;
  }

  const calculationsNeeded = steps.length;

  steps.push(new InvalidCalculation());

  resultsContainer.innerHTML = `
  <div class="calculations-needed">
  <p>Calculations needed:</p>
    <p><strong>${calculationsNeeded}</strong></p>
  </div>
  ${steps
    .map(
      (step, index) => `
      <div class="step">
      ${
        index == calculationsNeeded
          ? "<p> Every 4-digit number with at least 2 different digits will converge to the Keprekar's constant: <strong> 6174 </strong> </p>"
          : `<p class="step-count">Step ${index + 1}</p>
        <div class="step-content">
          <span class="step-label">Number:</span>
          <span> <strong> ${step.number} </strong> </span>
        </div>
        <div class="step-content">
          <span class="step-label">Calculation:</span>
          <span>${step.descending} - ${step.ascending} = <strong> ${
              step.result
            } </strong> </span>
      
        </div>`
      }
      
      </div>
    `
    )
    .join("")}
`;
}

// <div class="calculation-right">
//     <p><strong>Descending:</strong> ${step.descending}</p>
//     <p><strong>Ascending:</strong> ${step.ascending}</p>
//     <hr>
//     <p><strong>Result:</strong> ${step.result}</p>
// </div>
