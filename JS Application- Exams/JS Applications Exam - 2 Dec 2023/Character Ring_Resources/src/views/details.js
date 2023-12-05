import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as characterService from '../api/characterService.js';

const detailsTemplate = (character, user, isOwner) => html`
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
            <h3>Is This Useful:<span id="likes">0</span></h3>

            ${user 
                ? html`
                    <div id="action-buttons">
                        ${isOwner
                            ? html`
                                    <a href="/edit/${character._id}" id="edit-btn">Edit</a>
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
    const characterId = ctx.params.id;

    const character = await characterService.getCharacter(characterId);

    const isOwner = ctx.user && ctx.user._id === character._ownerId;

    ctx.render(detailsTemplate(character, ctx.user, isOwner));
}