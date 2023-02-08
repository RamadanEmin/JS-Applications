import { html } from '../../node_modules/lit-html/lit-html.js';
import * as carsServices from '../api/cars.js';
import { carPreview } from './templates/carTemplate.js';

const searchTemplate = (listings, onSearch) => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">

        ${listings.length > 0 
            ? listings.map(carPreview)
            : html`<p class="no-cars"> No results.</p>`}
        
    </div>
</section>`;

export async function searchPage(ctx) {
    ctx.render(searchTemplate([], onSearch));

    async function onSearch() {
        const value = document.getElementById('search-input').value;

        if (!value) {
            return alert('Please fill the field!');
        }

        const listings = await carsServices.searchListings(value);
        ctx.render(searchTemplate(listings, onSearch))
    }
}