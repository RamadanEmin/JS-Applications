import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as cosmeticServices from '../api/cosmetic.js';

const detailsTemplate = (product, user, isOwner) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${product.imageUrl} alt="example1" />
        <p id="details-title">${product.name}</p>
        <p id="details-category">
            Category: <span id="categories">${product.category}</span>
        </p>
        <p id="details-price">
            Price: <span id="price-number">${Number(product.price)}</span>$</p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Bought: <span id="buys">0</span> times.</h4>
                <span>${product.description}</span>
            </div>
        </div>

        ${user
            ? html `<div id="action-buttons">
                ${isOwner
                    ? html `<a href="/edit/${product._id}" id="edit-btn">Edit</a>
                            <a href="javascript:void(0)" id="delete-btn">Delete</a>`
                    : html `<a href="javascript:void(0)" id="buy-btn">Buy</a>`}
                </div>`
            : nothing
        }
             
    </div>
</section>`;

export async function detailsPage(ctx) {
    const productId = ctx.params.id;
    const product = await cosmeticServices.getProduct(productId);

    const isOwner = ctx.user && ctx.user._id === product._ownerId;

    ctx.render(detailsTemplate(product, ctx.user, isOwner));
}