const form = document.getElementById("incidentForm");
const incidentList = document.getElementById("incidentList");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const incidentDate = document.getElementById("incidentDate").value;
    const incidentTag = document.getElementById("incidentTag").value.trim();
    const severity = document.getElementById("severity").value;
    const comments = document.getElementById("comments").value.trim();
    const reporter = document.getElementById("reporter").value.trim();

    document.getElementById("incidentDateError").textContent = "";
    document.getElementById("incidentTagError").textContent = "";
    document.getElementById("severityError").textContent = "";
    document.getElementById("commentsError").textContent = "";
    document.getElementById("reporterError").textContent = "";

    let hasError = false;

    if (incidentDate === "") {
        document.getElementById("incidentDateError").textContent = "Оберіть дату інциденту";
        hasError = true;
    }

    if (incidentTag === "") {
        document.getElementById("incidentTagError").textContent = "Введіть тег інциденту";
        hasError = true;
    }

    if (severity === "") {
        document.getElementById("severityError").textContent = "Оберіть рівень серйозності";
        hasError = true;
    }

    if (comments === "") {
        document.getElementById("commentsError").textContent = "Введіть коментар";
        hasError = true;
    }

    if (reporter === "") {
        document.getElementById("reporterError").textContent = "Введіть ім'я того, хто повідомив";
        hasError = true;
    }

    if (hasError) {
        return;
    }

    const incidentItem = document.createElement("div");
    incidentItem.className = "incident-item";

    incidentItem.innerHTML = `
        <strong>Дата:</strong> ${incidentDate}<br>
        <strong>Тег:</strong> ${incidentTag}<br>
        <strong>Серйозність:</strong> ${severity}<br>
        <strong>Коментар:</strong> ${comments}<br>
        <strong>Хто повідомив:</strong> ${reporter}
    `;

    if (incidentList.innerHTML.includes("Поки що інцидентів немає")) {
        incidentList.innerHTML = "";
    }

    incidentList.appendChild(incidentItem);

    form.reset();
});