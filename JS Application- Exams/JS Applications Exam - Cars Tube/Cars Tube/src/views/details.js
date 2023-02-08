import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as carsServices from '../api/cars.js';

const detailsTemplate = (listing, onDelete) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${listing.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${listing.brand}</li>
            <li><span>Model:</span>${listing.model}</li>
            <li><span>Year:</span>${listing.year}</li>
            <li><span>Price:</span>${listing.price}$</li>
        </ul>

        <p class="description-para">${listing.description}</p>

        ${listing.isOwner
            ? html `<div class="listings-buttons">
                        <a href="/edit/${listing._id}" class="button-list">Edit</a>
                        <a @click=${onDelete} href="jacascript:void(0)" class="button-list">Delete</a>
                    </div>`
            : nothing}
        
    </div>
</section>`;

export async function detailsPage(ctx) {
    const carId = ctx.params.id;
    const listing = await carsServices.getCarById(carId, onDelete);

    if (ctx.user) {
        listing.isOwner = listing._ownerId === ctx.user._id;
    }

    ctx.render(detailsTemplate(listing, onDelete));

    function onDelete() {
        const choice = confirm(`Are you sure you want to delete this listing?`);
        if (choice) {
            carsServices.deleteListings(carId);
            ctx.page.redirect('/listings');
        }
    }
}