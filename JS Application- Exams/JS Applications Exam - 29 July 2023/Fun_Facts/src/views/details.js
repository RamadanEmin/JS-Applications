import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as funService from '../api/funService.js';

const detailsTemplate = (fact, user, isOwner, onDelete, likes, hasLike, onLike) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${fact.imageUrl} alt="example1" />
        <p id="details-category">${fact.category}</p>
        <div id="info-wrapper">
            <div id="details-description">
            <p id="description">${fact.description}</p>
            <p id ="more-info">${fact.moreInfo}</p>
            </div>

            <h3>Likes:<span id="likes">${likes}</span></h3>

        ${user && !hasLike
        ? html`
                <div id="action-buttons">
                ${isOwner
                ? html`
                        <a href="/edit/${fact._id}" id="edit-btn">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
                : html`<a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>`
            }
                </div>`
        : nothing}
        </div>
    </div>
</section>
`;


export async function detailsPage(ctx) {
    const factId = ctx.params.id;
    const request = [
        funService.getfact(factId),
        funService.getLikes(factId)
    ];

    if (ctx.user) {
        request.push(funService.likeFromUser(factId, ctx.user._id));
    }

    const [fact, likes, hasLike] = await Promise.all(request);
    console.log(fact);
    const isOwner = ctx.user && ctx.user._id === fact._ownerId;

    ctx.render(detailsTemplate(fact, ctx.user, isOwner, onDelete, likes, hasLike, onLike));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this event?');
        if (choice) {
            await funService.deleteFact(factId);

            ctx.page.redirect('/catalog');
        }
    }

    async function onLike() {
        await funService.addLike({ factId });

        ctx.page.redirect('/details/' + factId);
    }
}
