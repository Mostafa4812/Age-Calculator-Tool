const ageCalculate = () => {
    const today = new Date();
    const inputDate = new Date(document.getElementById("date-input").value);

    const birthDetails = {
        day: inputDate.getDate(),
        month: inputDate.getMonth() + 1,
        year: inputDate.getFullYear(),
    };

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();

    if (isFutureDate(birthDetails, currentYear, currentMonth, currentDate)) {
        alert("Not Born Yet !");
        displayResult("-", "-", "-");
        return;
    }

    const { years, months, days } = calculateAge(
        birthDetails,
        currentYear,
        currentMonth,
        currentDate
    );

    displayResult(days, months, years);
};

const isFutureDate = (
    birthDetails,
    currentYear,
    currentMonth,
    currentDate
) => {
    return (

        birthDetails.year > currentYear ||
        (birthDetails.year === currentYear &&
            (birthDetails.month > currentMonth ||
                (birthDetails.month === currentMonth) &&
                (birthDetails.day > currentDate ||
                    birthDetails.day === currentDate)))
    );
};

const calculateAge = (
    birthDetails,
    currentYear,
    currentMonth,
    currentDate
) => {
    let years = currentYear - birthDetails.year;
    let months, days;

    if (currentMonth < birthDetails.month) {
        years--;
        months = (12 + (currentMonth)) - birthDetails.month;
    }
    else {
        months = currentMonth - birthDetails.month;
    }
    if (currentDate < birthDetails.day) {
        months--;
        const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const daysInLastMonth = getDaysInMonth(lastMonth, currentYear);
        days = daysInLastMonth - (birthDetails.day - currentDate);
    }
    else {
        days = currentDate - birthDetails.day;
    }
    return { years, months, days };
};

const getDaysInMonth = (month, year) => {
    const isLeapYear = ((yaer % 4 == 0 && yaer % 100 != 0) || (yaer % 400 == 0));
    const getDaysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return getDaysInMonth[month - 1];
};

const displayResult = (bDay, bMonth, bYear) => {
    document.getElementById("years").textContent = bYear;
    document.getElementById("months").textContent = bMonth;
    document.getElementById("days").textContent = bDay;
};

document.addEventListener("DOMContentLoaded", function() {
    // Your JavaScript code here
    document.getElementById("calc-age-btn").addEventListener("click", ageCalculate);
});
