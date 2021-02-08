// Global variables
const downPayment = document.getElementById("down-payment");
const homePrice = document.querySelector("input#house-value");
const interestRate = document.querySelector("input#interest-rate");
const monthly = document.querySelector("input#monthly");
const yearsResult = document.getElementById("years-result");
const years = document.getElementById("years");
const button = document.querySelector("button#calc-btn");
const totalLoan = document.querySelector("h2#total-loan");
const monthlyPayment = document.querySelector("h2#monthly-payment");

// Functions
function checkInputs() {
    function greaterThanZero() {
        return downPayment.value >= 0 && homePrice.value > 0 && interestRate.value > 0;
    }

    function maximumValues() {
        return homePrice.value < 1000000000 && downPayment.value < homePrice.value && (monthly.checked && interestRate.value <= 1 || !monthly.checked && interestRate.value <= 12);
    }

    return greaterThanZero() && maximumValues();
}

function showErrorMessage() {
    totalLoan.textContent = `Error! Check your inputs and try again!`;
    monthlyPayment.textContent = "";
}

function calcTotalLoan() {
    let toBePaid = homePrice.value - downPayment.value;

    if(monthly.checked) {
        return toBePaid * (((1 + interestRate.value / 100) ** years.value * 12));
    }
}

// Main functions
button.addEventListener("click", function() {
    if(!checkInputs()){
        showErrorMessage();
        return;
    }

    let loan = calcTotalLoan();
    console.log(loan);
});

years.addEventListener("change", function() {
    yearsResult.textContent = `${years.value} years`;
});