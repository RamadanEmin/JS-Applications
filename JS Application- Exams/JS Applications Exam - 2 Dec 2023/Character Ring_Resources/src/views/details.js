import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as characterService from '../api/characterService.js';

const detailsTemplate = (character, user, isOwner, onDelete, likes, hasLike, onLike) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${character.imageUrl} alt="example1" />
        <div>
            <p id="details-category">${character.category}</p>
            <div id="info-wrapper">
                <div id="details-description">
                    <p id="description">${character.description}</p>
                    <p id ="more-info">${character.moreInfo}</p>
                </div>
            </div>
            <h3>Is This Useful:<span id="likes">${likes}</span></h3>

            ${user && !hasLike
                ? html`
                    <div id="action-buttons">
                        ${isOwner
                            ? html`
                                    <a href="/edit/${character._id}" id="edit-btn">Edit</a>
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
    const characterId = ctx.params.id;
    const request = [
        characterService.getCharacter(characterId),
        characterService.getTotalLikes(characterId)
    ];

    if (ctx.user) {
        request.push(characterService.getLikesFromUser(characterId, ctx.user._id));
    }

    const [character, likes, hasLike] = await Promise.all(request);

    const isOwner = ctx.user && ctx.user._id === character._ownerId;

    ctx.render(detailsTemplate(character, ctx.user, isOwner, onDelete, likes, hasLike, onLike));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this character?');
        if (choice) {
            await characterService.deleteCharacter(characterId);

            ctx.page.redirect('/catalog');
        }
    }

    async function onLike() {
        await characterService.addLike({ characterId });

        ctx.page.redirect('/details/' + characterId)
    }
}