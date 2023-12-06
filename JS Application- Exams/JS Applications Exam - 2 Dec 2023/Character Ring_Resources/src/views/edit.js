import { html } from '../../node_modules/lit-html/lit-html.js';
import * as characterService from '../api/characterService.js';
import { createSubmitHandler } from '../util.js';

const editTemplate = (characters, onSubmit) => html`
<section id="edit">
    <div class="form">
        <img class="border" src="./images/border.png" alt="">
        <h2>Edit Character</h2>
        <form @submit=${onSubmit} class="edit-form">
            <input
                type="text"
                name="category"
                id="category"
                placeholder="Character Type"
                .value=${characters.category}
            />
            <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
                .value=${characters.imageUrl}
            />
            <textarea
                id="description"
                name="description"
                placeholder="Description"
                rows="2"
                cols="10"
                .value=${characters.description}
            ></textarea>
            <textarea
                id="additional-info"
                name="additional-info"
                placeholder="Additional Info"
                rows="2"
                cols="10"
                .value=${characters.moreInfo}
            ></textarea>
            <button type="submit">Edit</button>
        </form>
        <img class="border" src="./images/border.png" alt="">
    </div>
</section>
`;

export async function editPage(ctx) {
    const characterId = ctx.params.id;
    const characters = await characterService.getCharacter(characterId);

    ctx.render(editTemplate(characters, createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
    const characterId = ctx.params.id;
    if (Object.values(data).some(v => v == '')) {
        return alert('All fields are required!');
    }

    await characterService.updateCharacter(characterId, {
        category: data.category,
        imageUrl: data['image-url'],
        description: data.description,
        moreInfo: data['additional-info']
    });

    event.target.reset();
    ctx.page.redirect('/details/' + characterId);
}