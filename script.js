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
const totalInterest = document.querySelector("h3#interest-in-total-loan");
const monthlyInterest = document.querySelector("h3#monthly-payment-of-interest");

// Functions
function checkInputs() {
    function greaterThanZero() {
        return Number(downPayment.value) >= 0 && Number(homePrice.value) > 0 && Number(interestRate.value) > 0;
    }

    function maximumValues() {
        return Number(homePrice.value) < 1000000000 && Number(downPayment.value) < Number(homePrice.value) && (Number(monthly.checked) && Number(interestRate.value) <= 1 || !Number(monthly.checked) && Number(interestRate.value <= 12));
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
        return (toBePaid * (((1 + interestRate.value / 100) ** (years.value * 12)))).toFixed(2);
    } else {
        return (toBePaid * ((1 + interestRate.value / 100) ** years.value)).toFixed(2);
    }
}

function calcMonthlyPayment(loan) {
    return (loan / (years.value * 12)).toFixed(2);
}

function showLoan(loan) {
    totalLoan.textContent = `Total loan: $${loan}`
}

function showMonthlyPayment(loan) {
    monthlyPayment.textContent = `Monthly payment: $${calcMonthlyPayment(loan)}`;
}

function calcTotalInterest(loan) {
    return (loan - Number(homePrice.value)).toFixed(2);
}

function showTotalInterest(totalInterestVal) {
    totalInterest.textContent = `Total interest: $${totalInterestVal}`;
}

function calcMonthlyInterest(loan) {
    return (calcTotalInterest(loan) / (years.value * 12)).toFixed(2);
}

function showMonthlyInterest(monthlyInterestVal) {
    monthlyInterest.textContent = `Monthly payment of interest: $${monthlyInterestVal}`;
}
 
// Main functions
button.addEventListener("click", function() {
    if(!checkInputs()){
        showErrorMessage();
        return;
    }

    let loan = calcTotalLoan();
    showLoan(loan);
    showMonthlyPayment(loan);
    
    let totalInterest = calcTotalInterest(loan);
    showTotalInterest(totalInterest);
    let monthlyInterestVal = calcMonthlyInterest(loan);
    showMonthlyInterest(monthlyInterestVal);
});

years.addEventListener("change", function() {
    yearsResult.textContent = `${years.value} years`;
});