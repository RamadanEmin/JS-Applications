import { html } from '../../node_modules/lit-html/lit-html.js';
import * as funService from '../api/funService.js';
import { createSubmitHandler } from '../util.js';

const editTemplate = (fact, onSubmit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Fact</h2>
        <form @submit=${onSubmit} class="edit-form">
            <input
            type="text"
            name="category"
            id="category"
            placeholder="Category"
            .value=${fact.category}
        />
        <input
            type="text"
            name="image-url"
            id="image-url"
            placeholder="Image URL"
            .value=${fact.imageUrl}
        />
        <textarea
        id="description"
        name="description"
        placeholder="Description"
        rows="10"
        cols="50"
        .value=${fact.description}
        ></textarea>
        <textarea
        id="additional-info"
        name="additional-info"
        placeholder="Additional Info"
        rows="10"
        cols="50"
        .value=${fact.moreInfo}
        ></textarea>
            <button type="submit">Post</button>
        </form>
    </div>
</section>
`;

export async function editPage(ctx) {
    const factId = ctx.params.id;
    const fact = await funService.getfact(factId);

    ctx.render(editTemplate(fact, createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
    const factId = ctx.params.id;
    if (Object.values(data).some(v => v == '')) {
        return alert('All fields are required!');
    }

    await funService.updateFact(factId, {
        category: data.category,
        imageUrl: data['image-url'],
        description: data.description,
        moreInfo: data['additional-info']
    });

    event.target.reset();
    ctx.page.redirect('/details/' + factId);
}