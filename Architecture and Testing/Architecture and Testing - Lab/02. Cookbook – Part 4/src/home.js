import { get } from './api.js';
import { e } from './dom.js';

const section = document.getElementById('home');
const recipesContainer = document.querySelector('.recent-recipes');

export async function home(ctx) {
  setActiveNav();
  ctx.render(section);

  const recipes = await get('/data/recipes?select=_id%2Cname%2Cimg&sortBy=_createdOn%20desc&pageSize=3');
  recipesContainer.replaceChildren(...recipes.map(createRecipeCard));
}

function createRecipeCard(recipe) {
  const result = e('article', { className: 'recent'},
    e('div', { className: 'recent-preview' }, e('img', { src: recipe.img })),
    e('div', { className: 'recent-title' }, recipe.name)
  );
  return result;
}