import { html } from '../../node_modules/lit-html/lit-html.js';
import * as fruitServices from '../api/fruits.js';

const searchTemplate = (listings, onSearch) => html`
<section id="search">
    <div class="form">
        <h2>Search</h2>
        <form class="search-form">
            <input type="text" name="search" id="search-input" />
            <button @click=${onSearch} class="button-list" type="submit">Search</button>
        </form>
    </div>
    <h4>Results:</h4>
    <div class="search-result">
        ${listings.length > 0
            ? listings.map(previewTemplate)
            : html`<p class="no-result">No result.</p>`
        }
    </div>
</section>
`;

const previewTemplate = (fruit) => html`
<div class="fruit">
    <img src=${fruit.imageUrl} alt="example1" />
    <h3 class="title">${fruit.name}</h3>
    <p class="description">${fruit.description}</p>
    <a class="details-btn" href="/details/${fruit._id}">More Info</a>
</div>
`;

export async function searchPage(ctx) {
    ctx.render(searchTemplate([], onSearch));

    async function onSearch(e) {
        e.preventDefault();
        const value = document.getElementById('search-input').value;

        if (!value) {
            return alert('Please fill the field!');
        }

        const listings = await fruitServices.searchFruits(value);
        ctx.render(searchTemplate(listings, onSearch))
    }
}