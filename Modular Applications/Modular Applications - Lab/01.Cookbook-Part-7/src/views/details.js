import { html } from '../dom.js';
import { getRecipeById } from '../api/data.js';

const detailsTemplate = (recipe, isOwner) => html`
<section id="details">
    ${recipeCard(recipe, isOwner)}
</section>`;

const recipeCard = (recipe, isOwner) => html`
<article>
    <h2>${recipe.name}</h2>
    <div class="band">
        <div class="thumb"><img src=${'/' + recipe.img}></div>
        <div class="ingredients">
            <h3>Ingredients:</h3>
            <ul>
                ${recipe.ingredients.map(i => html`<li>${i}</li>`)}
            </ul>
        </div>
    </div>
    <div class="description">
        <h3>Preparation:</h3>
        ${recipe.steps.map(s => html`<p>${s}</p>`)}
    </div>
    ${isOwner
        ? html`
    <div class="controls">
        <a class="actionLink" href=${'/edit/' + recipe._id}>\u270E Edit</a>
        <a class="actionLink" href="javascript:void(0)">\u2716 Delete</a>
    </div>`
        : ''}
</article>`;


export function setupDetails() {
    return showDetails;

    async function showDetails(context) {
        const id = context.params.id;
        const recipe = await getRecipeById(id);

        const userId = sessionStorage.getItem('userId');
        const isOwner = userId != null && recipe._ownerId == userId;

        return detailsTemplate(recipe, isOwner);
    }
}
