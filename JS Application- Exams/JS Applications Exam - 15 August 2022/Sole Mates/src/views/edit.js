import { html } from '../../node_modules/lit-html/lit-html.js';
import * as shopServices from '../api/shop.js';
import { createSubmitHandler } from '../util.js';

const editTemplate = (shoe, onSubmit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit item</h2>
        <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="brand" id="shoe-brand" placeholder="Brand" .value=${shoe.brand} />
            <input type="text" name="model" id="shoe-model" placeholder="Model" .value=${shoe.model} />
            <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" .value=${shoe.imageUrl} />
            <input type="text" name="release" id="shoe-release" placeholder="Release date" .value=${shoe.release} />
            <input type="text" name="designer" id="shoe-designer" placeholder="Designer" .value=${shoe.designer} />
            <input type="text" name="value" id="shoe-value" placeholder="Value" .value=${shoe.value} />

            <button type="submit">post</button>
        </form>
    </div>
</section>`;


export async function editPage(ctx) {
    const shoeId = ctx.params.id;
    const shoe = await shopServices.getShoeById(shoeId);

    ctx.render(editTemplate(shoe, createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
    const shoeId = ctx.params.id;

    if (Object.values(data).some(v => v == '')) {
        return alert('All fields are required!');
    }

    await shopServices.updateShoe(shoeId, {
        brand: data.brand,
        model: data.model,
        imageUrl: data.imageUrl,
        release: data.release,
        designer: data.designer,
        value: data.value
    });

    event.target.reset();
    ctx.page.redirect('/details/' + shoeId);
}