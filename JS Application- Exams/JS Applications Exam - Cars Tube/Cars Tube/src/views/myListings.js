import { html } from '../../node_modules/lit-html/lit-html.js';
import * as carsServices from '../api/cars.js';
import { carPreview } from './templates/carTemplate.js';

const myListingsTemplate = (myListings) => html`
<section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">

    ${myListings.length > 0 
            ? myListings.map(carPreview)
            : html`<p class="no-cars">You haven't listed any cars yet.</p>`}

    </div>
</section>`;

export async function myListingsPage(ctx) {
    const userId = ctx.user._id;
    const myListings = await carsServices.getMyListings(userId)

    ctx.render(myListingsTemplate(myListings));
}