// ================= DOM =================
const form = document.getElementById("incidentForm");
const incidentList = document.getElementById("incidentList");

// ================= SUBMIT =================
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const incidentDate = document.getElementById("incidentDate").value;
    const incidentTag = document.getElementById("incidentTag").value.trim();
    const severity = document.getElementById("severity").value;
    const comments = document.getElementById("comments").value.trim();
    const reporter = document.getElementById("reporter").value.trim();

    // очищення помилок
    clearErrors();

    let hasError = false;

    if (!incidentDate) {
        showError("incidentDate", "incidentDateError", "Оберіть дату");
        hasError = true;
    }

    if (!incidentTag) {
        showError("incidentTag", "incidentTagError", "Введіть тег");
        hasError = true;
    }

    if (!severity) {
        showError("severity", "severityError", "Оберіть рівень");
        hasError = true;
    }

    if (!comments) {
        showError("comments", "commentsError", "Введіть коментар");
        hasError = true;
    }

    if (!reporter) {
        showError("reporter", "reporterError", "Введіть ім’я");
        hasError = true;
    }

    if (hasError) return;

    // створення інциденту
    const item = document.createElement("div");
    item.className = "incident-item";

    item.innerHTML = `
        <strong>Дата:</strong> ${incidentDate}<br>
        <strong>Тег:</strong> ${incidentTag}<br>
        <strong>Серйозність:</strong> ${severity}<br>
        <strong>Коментар:</strong> ${comments}<br>
        <strong>Хто повідомив:</strong> ${reporter}
    `;

    // прибрати текст "немає"
    if (incidentList.innerHTML.includes("немає")) {
        incidentList.innerHTML = "";
    }

    incidentList.appendChild(item);

    form.reset();
});

// ================= ERRORS =================
function showError(inputId, errorId, message) {
    document.getElementById(inputId).classList.add("invalid");
    document.getElementById(errorId).textContent = message;
}

function clearErrors() {
    document.querySelectorAll(".invalid").forEach(el => el.classList.remove("invalid"));
    document.querySelectorAll(".error-text").forEach(el => el.textContent = "");
}