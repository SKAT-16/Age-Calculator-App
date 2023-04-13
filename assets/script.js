import { CountUp } from 'https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.6.0/countUp.js';

var themeChanger = document.querySelector(".theme-changer");
var themeChangerCircle = document.querySelector(".theme-changer span");
var mainSection = document.querySelector(".main");
var currentTheme = "light";

themeChanger.addEventListener("click", function changeTheme() {
    if (currentTheme == "light") {
        mainSection.classList.add("dark-mode");
        themeChangerCircle.classList.add("activate-dark-mode");
        currentTheme = "dark";
    }
    else if (currentTheme == "dark") {
        mainSection.classList.remove("dark-mode");
        themeChangerCircle.classList.remove("activate-dark-mode");
        currentTheme = "light";
    }
});

var dayText = document.querySelector("#day-input > h6");
var dayInput = document.querySelector("#day-input > input");
var dayInputErrorText = document.querySelector("#day-input > p");
var days;
var monthText = document.querySelector("#month-input > h6");
var monthInput = document.querySelector("#month-input > input");
var monthInputErrorText = document.querySelector("#month-input > p");
var months;
var yearText = document.querySelector("#year-input > h6");
var yearInput = document.querySelector("#year-input > input");
var yearInputErrorText = document.querySelector("#year-input > p");
var years;

const currentDate = new Date();

dayInput.addEventListener("input", function () {
    days = dayInput.value;
    dayInputErrorText.textContent = "";
    if (dayInput.value.length != 0) {
        if (!dayInput.validity.valid)
            dayInputErrorText.textContent = "Invalid input";
        else if (days > 31 || days <= 0)
            dayInputErrorText.textContent = "Must be a valid day!";

        if (dayInputErrorText.textContent != "") {
            dayText.style.color = "hsl(0, 100%, 67%)";
            dayInput.style.borderColor = "hsl(0, 100%, 67%)";
        } else {
            dayText.style.color = "hsl(0, 1%, 44%)";
            dayInput.style.borderColor = "hsl(0, 0%, 70%)";
        }
    }
});

monthInput.addEventListener("input", function () {
    months = monthInput.value;
    monthInputErrorText.textContent = "";
    if (monthInput.value.length != 0) {
        if (!monthInput.validity.valid)
            monthInputErrorText.textContent = "Invalid input";
        else if (months > 12 || months <= 0)
            monthInputErrorText.textContent = "Must be a valid month!";

        if (monthInputErrorText.textContent != "") {
            monthText.style.color = "hsl(0, 100%, 67%)";
            monthInput.style.borderColor = "hsl(0, 100%, 67%)";
        } else {
            monthText.style.color = "hsl(0, 1%, 44%)";
            monthInput.style.borderColor = "hsl(0, 0%, 70%)";
        }
    }
});

yearInput.addEventListener("input", function () {
    years = yearInput.value;
    yearInputErrorText.textContent = "";
    if (yearInput.value.length != 0) {
        if (!yearInput.validity.valid)
            yearInputErrorText.textContent = "Invalid input";
        else if (years <= 0)
            yearInputErrorText.textContent = "Must be a valid year!";
        else if (years > currentDate.getFullYear())
            yearInputErrorText.textContent = "Must be in the past!";

        if (yearInputErrorText.textContent != "") {
            yearText.style.color = "hsl(0, 100%, 67%)";
            yearInput.style.borderColor = "hsl(0, 100%, 67%)";
        } else {
            yearText.style.color = "hsl(0, 1%, 44%)";
            yearInput.style.borderColor = "hsl(0, 0%, 70%)";
        }
    }
});


function checkDate() {
    var validDate = true;

    dayText.style.color = "hsl(0, 1%, 44%)";
    dayInput.style.borderColor = "hsl(0, 0%, 70%)";
    monthText.style.color = "hsl(0, 1%, 44%)";
    monthInput.style.borderColor = "hsl(0, 0%, 70%)";
    yearText.style.color = "hsl(0, 1%, 44%)";
    yearInput.style.borderColor = "hsl(0, 0%, 70%)";

    if (dayInput.value.length == 0) {
        dayInputErrorText.textContent = "This field is required!";
        dayText.style.color = "hsl(0, 100%, 67%)";
        dayInput.style.borderColor = "hsl(0, 100%, 67%)";
        validDate = false;
    }
    if (monthInput.value.length == 0) {
        monthInputErrorText.textContent = "This field is required!";
        monthText.style.color = "hsl(0, 100%, 67%)";
        monthInput.style.borderColor = "hsl(0, 100%, 67%)";
        validDate = false;
    }
    if (yearInput.value.length == 0) {
        yearInputErrorText.textContent = "This field is required!";
        yearText.style.color = "hsl(0, 100%, 67%)";
        yearInput.style.borderColor = "hsl(0, 100%, 67%)";
        validDate = false;
    }

    return validDate;
}

var inputDate = new Date();
var age = new Date();
var submitBtn = document.querySelector(".submit-section .submit-btn");
var yearsCount = new CountUp('years-text', { useEasing: true});
var monthsCount = new CountUp('months-text', { useEasing: true });
var daysCount = new CountUp('days-text', { useEasing: true });

submitBtn.addEventListener("click", function () {
    if (checkDate()) {
        inputDate.setFullYear(years, months - 1, days);
        age = calculate_age(inputDate);
        
        yearsCount.update(age.getFullYear());
        monthsCount.update(age.getMonth());
        daysCount.update(age.getDate());
    }
});

function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);
    age_dt.setFullYear(age_dt.getFullYear() - 1970);
    return age_dt;
}