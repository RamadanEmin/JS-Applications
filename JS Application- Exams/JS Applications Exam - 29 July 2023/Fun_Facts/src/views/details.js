import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as funService from '../api/funService.js';

const detailsTemplate = (fact, user, isOwner) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${fact.imageUrl} alt="example1" />
        <p id="details-category">${fact.category}</p>
        <div id="info-wrapper">
            <div id="details-description">
            <p id="description">${fact.description}</p>
            <p id ="more-info">${fact.moreInfo}</p>
            </div>

            <h3>Likes:<span id="likes">0</span></h3>

        ${user 
        ? html`
                <div id="action-buttons">
                ${isOwner
                ? html`
                        <a href="/edit/${fact._id}" id="edit-btn">Edit</a>
                        <a href="javascript:void(0)" id="delete-btn">Delete</a>`
                : html`<a href="javascript:void(0)" id="like-btn">Like</a>`
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
        ,
        funService.getLikes(factId)
    ];

    if (ctx.user) {
        request.push(funService.likeFromUser(factId, ctx.user._id));
    }

    const fact = await funService.getfact(factId);
    const isOwner = ctx.user && ctx.user._id === fact._ownerId;

    ctx.render(detailsTemplate(fact, ctx.user, isOwner));

}
