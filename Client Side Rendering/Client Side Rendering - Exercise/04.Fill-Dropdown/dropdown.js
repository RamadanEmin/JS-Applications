import { html, render } from '../node_modules/lit-html/lit-html.js';

const selectTemplate = (items) => html`
<select id="menu">
    ${items.map(i => html`<option value=${i._id}>${i.text}</option>`)}
</select>`;

const url = 'http://localhost:3030/jsonstore/advanced/dropdown';
const root = document.querySelector('div');
const form = document.querySelector('form');
form.addEventListener('submit', addItem);
getData();

async function getData() {
    const response = await fetch(url);
    const data = await response.json();

    update(Object.values(data));
}

function update(items) {
    const result = selectTemplate(items);
    render(result, root);
}

async function addItem(event) {
    event.preventDefault();
    const text = document.getElementById('itemText').value;

    const response = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
    });

    if (response.ok) {
        getData();
    }
    form.reset();
}