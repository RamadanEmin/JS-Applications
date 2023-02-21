import { html } from '../../node_modules/lit-html/lit-html.js';
import * as cosmeticServices from '../api/cosmetic.js';

const catalogTemplate = (products) => html`
<h2>Products</h2>
<section id="dashboard">
    ${products.length > 0
        ? products.map(previewTemplate)
        : html `<h2>No products yet.</h2>`}
</section>`;

const previewTemplate = (product) => html`
<div class="product">
    <img src=${product.imageUrl} alt="example1" />
    <p class="title">${product.name}</p>
    <p><strong>Price:</strong><span class="price">${Number(product.price)}</span>$</p>
    <a class="details-btn" href="/details/${product._id}">Details</a>
</div>`;

export async function catalogPage(ctx) {
    const products = await cosmeticServices.getAllProducts();

    ctx.render(catalogTemplate(products));
}