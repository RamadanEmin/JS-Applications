import { html } from '../../node_modules/lit-html/lit-html.js';
import * as carsServices from '../api/cars.js';
import { carPreview } from './templates/carTemplate.js';

const catalogTemplate = (cars) => html`
<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">
        ${cars.length > 0 
            ? cars.map(carPreview)
            : html`<p class="no-cars">No cars in database.</p>`}
    </div>
</section>`;

export async function catalogPage(ctx) {
    const cars = await carsServices.getAllListings();

    ctx.render(catalogTemplate(cars));
}