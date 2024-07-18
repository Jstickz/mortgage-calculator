const clearBtn = document.getElementById("clear-all-btn");
const mortgageAmount = document.getElementById("amount");
const mortgageTerm = document.getElementById("term");
const mortgageRate = document.getElementById("rate");
const radioBtn = document.getElementsByName("radio-type");
const calculateBtn = document.getElementById("btn");
const errorMsg = document.querySelectorAll(".error-msg");
const errorColor = document.querySelectorAll(".err-color");
const labelColor = document.querySelectorAll(".label");

const repayAmount = document.getElementById("repay-amount");
const totalRepayAmount = document.getElementById("total-repay-amount");
const results = document.getElementById("results");
const preview = document.getElementById("preview");
const yourTotalInterest = document.getElementById("yourTotalInterest");

// const repayment = document.getElementById("repayment");
// const interest = document.getElementById("interest");

let principal = 0;
let term = 0;
let interestRate = 0;

mortgageAmount.oninput = function () {
  var removeChar = this.value.replace(/[^0-9\.]/g, "");
  var removeDot = removeChar.replace(/\./g, "");
  this.value = removeDot;

  var formatedNumber = this.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  this.value = formatedNumber;

  principal = parseFloat(removeChar.replace(/,/g, ""));
};

mortgageTerm.oninput = function () {
  var removeChar = this.value.replace(/[^0-9\.]/g, "");
  var removeDot = removeChar.replace(/\./g, "");
  this.value = removeDot;

  if (this.value > 100) {
    this.value = "";
    alert("Your mortgage term should be less than or equal to 100 years");
  }

  term = parseFloat(removeChar);
};

mortgageRate.oninput = function () {
  if (isNaN(this.value) || this.value < 0 || this.value > 100) {
    this.value = "";
    alert("Percentage should be less than or equal to 100");
  } else if (this.value.length > 6) {
    this.value = "";
    alert("Input not more than 6 characters");
  }

  interestRate = parseFloat(this.value);
};

const totalCal = () => {
  const newRate = interestRate / 100 / 12;
  const newTerm = term * 12;
  const numerator = newRate * Math.pow((1 + newRate), newTerm);
  const denominator = Math.pow((1 + newRate), newTerm) - 1;
  const fraction = numerator / denominator;

  const monthlyRepayment = principal * fraction;
  const roundedMonthlyRepayment = monthlyRepayment.toFixed(2);
  const formatedMonthlyRepayment = Number(roundedMonthlyRepayment).toLocaleString();

  const totalRepayment = monthlyRepayment * newTerm;
  const roundedTotalRepayment = totalRepayment.toFixed(2);
  const formatedtTotalRepayment = Number(roundedTotalRepayment).toLocaleString();

  const totalRepayInterest = (monthlyRepayment * newTerm) - principal;
  const roundedTotalRepayInterest = totalRepayInterest.toFixed(2);
  const formatedTotalInterest = Number(roundedTotalRepayInterest).toLocaleString();
 

  for (let i = 0; i < radioBtn.length; i++) {
    if (radioBtn[0].checked) {
      yourTotalInterest.textContent = `Your monthly repayment is:`;
      repayAmount.textContent = `£ ${formatedMonthlyRepayment}`;
      totalRepayAmount.textContent = `£ ${formatedtTotalRepayment}`;
      results.style.display = "block";
      preview.style.display = "none";

    } else if (radioBtn[1].checked) {
      yourTotalInterest.textContent = `Your total interest is:`
      repayAmount.textContent = `£ ${formatedTotalInterest}`;
      totalRepayAmount.textContent = `£ ${formatedtTotalRepayment}`;
      results.style.display = "block";
      preview.style.display = "none";
    }
  }
    
};




calculateBtn.addEventListener("click", () => {
  if (
    mortgageAmount.value === "" ||
    mortgageTerm.value === "" ||
    mortgageRate.value === ""
  ) {
    for (let i = 0; i < errorMsg.length; i++) {
      const prevErrorMsg = errorMsg[i].style.display;
      errorMsg[i].style.display = "block";

      setTimeout(() => {
        errorMsg[i].style.display = prevErrorMsg;
      }, 2000);
    }

    for (let i = 0; i < errorColor.length; i++) {
      const prevErrorColor = errorColor[i].style.borderColor;
      errorColor[i].style.borderColor = "#fd1900";

      setTimeout(() => {
        errorColor[i].style.borderColor = prevErrorColor;
      }, 2000);
    }

    for (let i = 0; i < labelColor.length; i++) {
      const prevLabelColor = labelColor[i].style.backgroundColor;
      labelColor[i].style.backgroundColor = "#D83320";
      const prevLabelFontColor = labelColor[i].style.color;
      labelColor[i].style.color = "#fff";

      setTimeout(() => {
        labelColor[i].style.backgroundColor = prevLabelColor;
        labelColor[i].style.color = prevLabelFontColor;
      }, 2000);
    }
  } else {
    // return;
  }
});

clearBtn.addEventListener("click", () => {
  mortgageAmount.value = "";
  mortgageRate.value = "";
  mortgageTerm.value = "";
  for (let i = 0; i < radioBtn.length; i++) {
    radioBtn[i].checked = false;
  }
  results.style.display = "none";
  preview.style.display = "block";
});

calculateBtn.addEventListener('click', (e) => {
  e.preventDefault();
  totalCal();
})