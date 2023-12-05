import { html } from '../../node_modules/lit-html/lit-html.js';
import * as motorcycleServices from '../api/motorcycles.js';

const searchTemplate = (listings, onSearch) => html`
<section id="search">
    <div class="form">
        <h4>Search</h4>
        <form class="search-form">
            <input
            type="text"
            name="search"
            id="search-input"
            />
            <button @click=${onSearch} class="button-list">Search</button>
        </form>
    </div>
    <h4 id="result-heading">Results:</h4>
    <div class="search-result">
        ${listings.length > 0
            ? listings.map(previewTemplate)
            : html`<h2 class="no-avaliable">No result.</h2>`
        }
    </div>
</section>
`;

const previewTemplate = (motorcycle) => html`
<div class="motorcycle">
    <img src=${motorcycle.imageUrl} alt="example1" />
    <h3 class="model">${motorcycle.model}</h3>
    <a class="details-btn" href="/details/${motorcycle._id}">More Info</a>
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

        const listings = await motorcycleServices.searchMotorcycle(value);
        ctx.render(searchTemplate(listings, onSearch))
    }
}