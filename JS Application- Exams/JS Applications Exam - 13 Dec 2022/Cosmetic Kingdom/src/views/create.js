import { html } from '../../node_modules/lit-html/lit-html.js';
import * as cosmeticServices from '../api/cosmetic.js';
import { createSubmitHandler } from '../util.js';

const createTemplate = (onSubmit) => html`
<section id="create">
    <div class="form">
        <h2>Add Product</h2>
        <form @submit=${onSubmit} class="create-form">
            <input type="text" name="name" id="name" placeholder="Product Name" />
            <input type="text" name="imageUrl" id="product-image" placeholder="Product Image" />
            <input type="text" name="category" id="product-category" placeholder="Category" />
            <textarea id="product-description" name="description" placeholder="Description" rows="5"
                cols="50"></textarea>

            <input type="text" name="price" id="product-price" placeholder="Price" />

            <button type="submit">Add</button>
        </form>
    </div>
</section>`;

export async function createPage(ctx) {
    const productId = ctx.params.id;

    ctx.render(createTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
    if (Object.values(data).some(v => v == '')) {
        return alert('All fields are required!');
    }

    await cosmeticServices.addNewProduct({
        name: data.name,
        imageUrl: data.imageUrl,
        category: data.category,
        description: data.description,
        price: data.price
    });

    event.target.reset();
    ctx.page.redirect('/catalog');
}