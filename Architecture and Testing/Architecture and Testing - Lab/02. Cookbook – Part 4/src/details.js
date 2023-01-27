import { e } from './dom.js';
import { getRecipeById } from './util.js';

const main = document.querySelector('main');
const section = document.getElementById('details');

export async function showDetails(id) {
    main.innerHTML = 'Loading&hellip;';

    const recipe = await getRecipeById(id);
    section.innerHTML = '';
    main.replaceChildren(section);
    section.appendChild(createRecipeCard(recipe));
}

function createRecipeCard(recipe) {
    const result = e('article', {},
        e('h2', {}, recipe.name),
        e('div', { className: 'band' },
            e('div', { className: 'thumb' }, e('img', { src: recipe.img })),
            e('div', { className: 'ingredients' },
                e('h3', {}, 'Ingredients:'),
                e('ul', {}, recipe.ingredients.map(i => e('li', {}, i))),
            )
        ),
        e('div', { className: 'description' },
            e('h3', {}, 'Preparation:'),
            recipe.steps.map(s => e('p', {}, s))
        ),
    );

    return result;

}