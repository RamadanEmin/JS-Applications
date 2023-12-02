import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as eventServices from '../api/data.js';

const detailsTemplate = (event, user, isOwner, onDelete, goings, hasGoing, onGoing) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${event.imageUrl} alt="example1" />
        <p id="details-title">${event.name}</p>
        <p id="details-category">
            Category: <span id="categories">${event.category}</span>
        </p>
        <p id="details-date">
            Date:<span id="date">${event.date}</span></p>
        <div id="info-wrapper">
            <div id="details-description">
                <span>${event.description}</span>
            </div>

        </div>

        <h3>Going: <span id="go">${goings}</span> times.</h3>

        ${user && !hasGoing
        ? html`
                <div id="action-buttons">
                    ${isOwner
                ? html`
                    <a href="/edit/${event._id}" id="edit-btn">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
                : html`<a @click=${onGoing} href="javascript:void(0)" id="go-btn">Going</a>`
            }
                </div>`
        : nothing
    }   
    </div>
</section>`;

export async function detailsPage(ctx) {
    const eventId = ctx.params.id;
    const request = [
        eventServices.getEvent(eventId),
        eventServices.getTotal(eventId)
    ];

    if (ctx.user) {
        request.push(eventServices.numberOfGoings(eventId, ctx.user._id));
    }

    const [event, goings, hasGoing] = await Promise.all(request);

    const isOwner = ctx.user && ctx.user._id === event._ownerId;

    ctx.render(detailsTemplate(event, ctx.user, isOwner, onDelete, goings, hasGoing, onGoing));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this event?');
        if (choice) {
            await eventServices.deleteEvent(eventId);

            ctx.page.redirect('/catalog');
        }
    }

    async function onGoing() {
        await eventServices.addPeople({ eventId });

        ctx.page.redirect('/details/' + eventId)
    }
}