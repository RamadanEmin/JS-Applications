import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as cosmeticServices from '../api/cosmetic.js';

const detailsTemplate = (product, user, isOwner, buys, hasBuy, onDelete, onBuy) => html`
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
                <h4>Bought: <span id="buys">${buys}</span> times.</h4>
                <span>${product.description}</span>
            </div>
        </div>

        ${user && !hasBuy
            ? html `<div id="action-buttons">
                ${isOwner
                    ? html `<a href="/edit/${product._id}" id="edit-btn">Edit</a>
                            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
                    : html `<a @click=${onBuy} href="javascript:void(0)" id="buy-btn">Buy</a>`}
                </div>`
            : nothing
        }
             
    </div>
</section>`;

export async function detailsPage(ctx) {
    const productId = ctx.params.id;
    const request = [
        cosmeticServices.getProduct(productId),
        cosmeticServices.getAllBuys(productId)
    ];

    if (ctx.user) {
        request.push(cosmeticServices.presetBuy(productId, ctx.user._id));
    }

    const [product, buys, hasBuy] = await Promise.all(request);

    const isOwner = ctx.user && ctx.user._id === product._ownerId;

    ctx.render(detailsTemplate(product, ctx.user, isOwner, buys, hasBuy, onDelete, onBuy));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this product?');
        if (choice) {
            await cosmeticServices.deleteProduct(productId);

            ctx.page.redirect('/catalog');
        }
    }

    async function onBuy() {
        await cosmeticServices.addBuys({ productId });

        ctx.page.redirect('/details/' + productId)
    }
}