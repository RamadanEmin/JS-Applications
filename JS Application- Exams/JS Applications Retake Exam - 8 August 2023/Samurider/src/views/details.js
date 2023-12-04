import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as motorcycleServices from '../api/motorcycles.js';

const detailsTemplate = (motorcycle, isOwner, onDelete) => html`
<section id="details">
        <div id="details-wrapper">
        <img id="details-img" src=${motorcycle.imageUrl} alt="example1" />
        <p id="details-title">${motorcycle.model}</p>
        <div id="info-wrapper">
            <div id="details-description">
            <p class="year">Year: ${motorcycle.year}</p>
            <p class="mileage">Mileage: ${motorcycle.mileage} km.</p>
            <p class="contact">Contact Number: ${motorcycle.contact}</p>
            <p id = "motorcycle-description">${motorcycle.about}</p>
            </div>
            ${isOwner
                ? html`<div id="action-buttons">
                            <a href="/edit/${motorcycle._id}" id="edit-btn">Edit</a>
                            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
                        </div>`
                :nothing}
        </div>
    </div>
</section>
`;

export async function detailsPage(ctx) {
    const motorcycleId = ctx.params.id;

    const motorcycle = await motorcycleServices.getMotorcycle(motorcycleId);

    const isOwner = ctx.user && ctx.user._id === motorcycle._ownerId;

    ctx.render(detailsTemplate(motorcycle, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this event?');
        if (choice) {
            await motorcycleServices.deleteMotorcycle(motorcycleId);

            ctx.page.redirect('/catalog');
        }
    }
}