import { html } from '../../node_modules/lit-html/lit-html.js';
import * as cosmeticServices from '../api/cosmetic.js';
import { createSubmitHandler } from '../util.js';

const editTemplate = (product, onSubmit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Product</h2>
        <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="name" id="name" placeholder="Product Name" .value=${product.name}/>
            <input type="text" name="imageUrl" id="product-image" placeholder="Product Image" .value=${product.imageUrl}/>
            <input type="text" name="category" id="product-category" placeholder="Category" .value=${product.category}/>
            <textarea id="product-description" name="description" placeholder="Description" rows="5"
                cols="50" .value=${product.description}></textarea>

            <input type="text" name="price" id="product-price" placeholder="Price" .value=${product.price}/>
            <button type="submit">post</button>
        </form>
    </div>
</section>`;

export async function editPage(ctx) {
    const productId = ctx.params.id;
    const product = await cosmeticServices.getProduct(productId)

    ctx.render(editTemplate(product, createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
    const productId = ctx.params.id;
    if (Object.values(data).some(v => v == '')) {
        return alert('All fields are required!');
    }

    await cosmeticServices.updateProduct(productId, {
        name: data.name,
        imageUrl: data.imageUrl,
        category: data.category,
        description: data.description,
        price: data.price
    });

    event.target.reset();
    ctx.page.redirect('/details/' + productId);
}