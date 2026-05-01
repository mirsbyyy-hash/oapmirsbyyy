let incidents = JSON.parse(localStorage.getItem("incidents")) || [];
let editIndex = -1;

let sortField = null;
let sortDirection = "asc";

function saveIncidents() {
    localStorage.setItem("incidents", JSON.stringify(incidents));
}

function sortBy(field) {
    if (sortField === field) {
        sortDirection = sortDirection === "asc" ? "desc" : "asc";
    } else {
        sortField = field;
        sortDirection = "asc";
    }
    showIncidents();
}

function showIncidents() {
    const tableBody = document.getElementById("tableBody");
    const emptyText = document.getElementById("emptyText");

    tableBody.innerHTML = "";

    let sorted = [...incidents];

    if (sortField) {
        sorted.sort((a, b) => {
            let valA = a[sortField];
            let valB = b[sortField];

            if (sortField === "date") {
                valA = new Date(valA);
                valB = new Date(valB);
            }

            return sortDirection === "asc"
                ? valA > valB ? 1 : -1
                : valA < valB ? 1 : -1;
        });
    }

    if (sorted.length === 0) {
        emptyText.style.display = "block";
        return;
    }

    emptyText.style.display = "none";

    sorted.forEach((incident, index) => {
        const realIndex = incidents.indexOf(incident);

        tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${incident.date}</td>
                <td>${incident.type}</td>
                <td>${incident.level}</td>
                <td>${incident.comment}</td>
                <td>${incident.person}</td>
                <td>
                    <button class="edit-btn" onclick="editIncident(${realIndex})">✏️</button>
                    <button class="delete-btn" onclick="deleteIncident(${realIndex})">🗑️</button>
                </td>
            </tr>
        `;
    });
}

function addIncident() {
    const date = document.getElementById("dateInput").value;
    const type = document.getElementById("typeInput").value;
    const level = document.getElementById("levelInput").value;
    const comment = document.getElementById("commentInput").value;
    const person = document.getElementById("personInput").value;

    if (!date || !type || !level || !comment || !person) {
        alert("Заповніть всі поля");
        return;
    }

    const newIncident = { date, type, level, comment, person };

    if (editIndex === -1) {
        incidents.push(newIncident);
    } else {
        incidents[editIndex] = newIncident;
        editIndex = -1;
        document.getElementById("mainButton").textContent = "Додати";
    }

    saveIncidents();
    showIncidents();
    clearForm();
}

function editIncident(index) {
    const i = incidents[index];

    document.getElementById("dateInput").value = i.date;
    document.getElementById("typeInput").value = i.type;
    document.getElementById("levelInput").value = i.level;
    document.getElementById("commentInput").value = i.comment;
    document.getElementById("personInput").value = i.person;

    editIndex = index;
    document.getElementById("mainButton").textContent = "Зберегти";
}

function deleteIncident(index) {
    incidents.splice(index, 1);
    saveIncidents();
    showIncidents();
}

function clearForm() {
    document.getElementById("dateInput").value = "";
    document.getElementById("typeInput").value = "";
    document.getElementById("levelInput").value = "";
    document.getElementById("commentInput").value = "";
    document.getElementById("personInput").value = "";
}

showIncidents();