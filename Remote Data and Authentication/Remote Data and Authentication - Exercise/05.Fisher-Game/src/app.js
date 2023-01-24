const url = 'http://localhost:3030/data/catches';
let userData = null;

window.addEventListener('DOMContentLoaded', () => {
    userData = JSON.parse(sessionStorage.getItem('userData'));
    const catches = document.getElementById('catches');
    catches.innerHTML = '';
    if (userData !== null) {
        document.getElementById('guest').style.display = 'none';
        document.querySelector('#addForm .add').disabled = false;
        document.querySelector('nav p span').textContent = userData.email;
        loadCatches();
    } else {
        document.getElementById('user').style.display = 'none';
        document.querySelector('nav p span').textContent = 'guest';
    }

    document.querySelector('.load').addEventListener('click', loadCatches);
    document.getElementById('logout').addEventListener('click', logout);
    document.getElementById('addForm').addEventListener('submit', addCatch);
    catches.addEventListener('click', eventHandler);
});

async function loadCatches() {
    const response = await fetch(url);
    const data = await response.json();

    document.getElementById('catches').replaceChildren(...data.map(createCatch));
}

async function logout() {
    await fetch('http://localhost:3030/users/logout', {
        headers: {
            'X-authorization': userData.token
        }
    });
    sessionStorage.clear();
    window.location = './index.html';
}

async function addCatch(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    if (Array.from(formData.values()).some(val => val === '')) {
        alert('Fill all the fieldss');
        return;
    }

    try {
        const response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-authorization': userData.token
            },
            body: JSON.stringify(Object.fromEntries(formData))
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const newCatch = await response.json();
        document.getElementById('catches').appendChild(createCatch(newCatch));

        Object
            .values(event.target)
            .filter(el => el.nodeName === 'INPUT')
            .forEach(el => el.value = '');

        // event.target.reset();
        // loadCatches();
    } catch (error) {
        alert(error.message);
    }
}

async function updateCatch(event) {
    const catchId = event.target.parentNode.dataset.id;

    const data = Object.fromEntries(Array.from(event.target.parentNode.children)
        .filter(el => el.nodeName === 'INPUT')
        .map(el => [el.className, el.value]));

    const response = await fetch(`${url}/${catchId}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'X-authorization': userData.token
        },
        body: JSON.stringify(data)
    });
}

async function deleteCatch(event) {
    const catchId = event.target.parentNode.dataset.id;
    event.target.parentNode.remove();

    await fetch(`${url}/${catchId}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'X-authorization': userData.token
        }
    });
}

function eventHandler(event) {
    if (event.target.nodeName !== 'BUTTON') {
        return;
    }
    event.target.className == 'update'
        ? updateCatch(event)
        : deleteCatch(event);
}

function createCatch(data) {
    const div = createElement('div', { className: 'catch' },
        createElement('label', null, 'Angler'),
        createElement('input', { type: 'text', className: 'angler', value: data.angler }),
        createElement('label', null, 'Weight'),
        createElement('input', { type: 'text', className: 'weight', value: data.weight }),
        createElement('label', null, 'Species'),
        createElement('input', { type: 'text', className: 'species', value: data.species }),
        createElement('label', null, 'Location'),
        createElement('input', { type: 'text', className: 'location', value: data.location }),
        createElement('label', null, 'Bait'),
        createElement('input', { type: 'text', className: 'bait', value: data.bait }),
        createElement('label', null, 'Capture Time'),
        createElement('input', { type: 'text', className: 'captureTime', value: data.captureTime }),
        createElement('button', { className: 'update', id: data._id }, 'Update'),
        createElement('button', { className: 'delete', id: data._id }, 'Delete')
    )
    div.dataset.id = data._id;

    const isOwner = userData && data._ownerId === userData.id;
    if (!isOwner) {
        div.querySelector('.angler').setAttribute('disabled', true);
        div.querySelector('.weight').setAttribute('disabled', true);
        div.querySelector('.species').setAttribute('disabled', true);
        div.querySelector('.location').setAttribute('disabled', true);
        div.querySelector('.bait').setAttribute('disabled', true);
        div.querySelector('.captureTime').setAttribute('disabled', true);
        div.querySelector('.update').setAttribute('disabled', true);
        div.querySelector('.delete').setAttribute('disabled', true);
    }
    return div;
}

function createElement(type, attributes, ...content) {
    const result = document.createElement(type);
    for (const [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) === 'on') {
            result.addEventListener(attr.substring(2).toLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }
    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);
    content.forEach(c => {
        if (typeof c === 'number' || typeof c === 'string') {
            const node = document.createTextNode(c);
            result.appendChild(node);
        } else {
            result.appendChild(c);
        }
    });
    return result;
}