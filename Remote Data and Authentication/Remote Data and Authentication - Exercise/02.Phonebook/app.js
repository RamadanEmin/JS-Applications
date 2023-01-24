function attachEvents() {
    document.getElementById("btnLoad").addEventListener('click', onLoadAllRecord);
    document.getElementById('btnCreate').addEventListener('click', heandleCreateRecord);
}
function heandleCreateRecord() {
    const personEl = document.getElementById("person");
    const phoneEl = document.getElementById("phone");

    if (personEl.value != "" && phoneEl.value != "") {
        onCreatReacord(personEl.value, phoneEl.value);
        personEl.value = "";
        phoneEl.value = "";
    }
};
function renderRecords(data) {
    const ul = document.getElementById("phonebook");
    ul.innerHTML = "";
    Object.values(data).forEach(rec => {
        const li = document.createElement("li");
        li.textContent = `${rec.person}: ${rec.phone}`;
        li.setAttribute("data-id", rec._id);

        const btnDelete = document.createElement("button");
        btnDelete.textContent = "Delete";
        btnDelete.addEventListener('click', handleDelete)

        li.appendChild(btnDelete);
        ul.appendChild(li);
    });
};
function handleDelete(e) {
    const li = e.target.parentElement
    const id = li.getAttribute("data-id");
    deleteReacord(id);
    li.remove();
};
async function onLoadAllRecord() {
    const url = `http://localhost:3030/jsonstore/phonebook`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Error")
    }
    const data = await response.json();

    return renderRecords(data);
};
async function onCreatReacord(person, phone) {
    const url = `http://localhost:3030/jsonstore/phonebook`;
    const body = {
        person,
        phone
    };
    const headers = getHeader("POST", body);
    const response = await fetch(url, headers)
    if (!response.ok) {
        throw new Error("Error");
    }
    const data = await response.json();
    
    onLoadAllRecord();

    return data;
};
async function deleteReacord(id) {
    const url = `http://localhost:3030/jsonstore/phonebook/${id} `;

    const headers = getHeader("DELETE", null);
    const response = await fetch(url, headers);
    if (!response.ok) {
        throw new Error("Error");
    }
    const data = await response.json();
    return data;
}
function getHeader(method, body) {
    return {
        method: `${method}`,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }
}
attachEvents();