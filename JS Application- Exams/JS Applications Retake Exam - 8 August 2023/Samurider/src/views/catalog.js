import { html } from '../../node_modules/lit-html/lit-html.js';
import * as motorcycleServices from '../api/motorcycles.js';

const catalogTemplate = (motorcycles) => html`
<h2>Available Motorcycles</h2>
<section id="dashboard">
    ${motorcycles.length > 0
        ? motorcycles.map(previewTemplate)
        : html`<h2 class="no-avaliable">No avaliable motorcycles yet.</h2>`
    }
</section>
`;

const previewTemplate = (motorcycle) => html`
<div class="motorcycle">
    <img src=${motorcycle.imageUrl} alt="example1" />
    <h3 class="model">${motorcycle.model}</h3>
    <p class="year">Year: ${motorcycle.year}</p>
    <p class="mileage">Mileage: ${motorcycle.mileage} km.</p>
    <p class="contact">Contact Number: ${motorcycle.contact}</p>
    <a class="details-btn" href="/details/${motorcycle._id}">More Info</a>
</div>
`;

export async function catalogPage(ctx) {
    const motorcycles = await motorcycleServices.getAllMotorcycles();
    ctx.render(catalogTemplate(motorcycles));
}