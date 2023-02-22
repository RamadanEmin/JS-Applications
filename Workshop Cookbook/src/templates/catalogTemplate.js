import { html, nothing } from "../../node_modules/lit-html/lit-html.js";

export const catalogTemplate = (recipesInfo) => html`
<section id="catalog">
    <div class="section-title">
    </div>
    <header class="section-title"></header>
     ${recipesInfo.recipes.length > 0
     ? html`${recipesInfo.recipes.map(recipePreview)}`
     : html`<h1>No recipes yet...</h1>`
    }
    <footer class="section-title"></footer>
</section>`;

const recipePreview = (recipe) => html`
<a class="card" href=${`/details/${recipe._id}`}> <article class="preview">
    <div class="title">
        <h2>${recipe.name}</h2>
        <span><img src="../../assets/thumbs-up-2.svg" height="50" width="50"></span>
    </div>
    <div class="small"><img src="${recipe.img.startsWith(`assets`) ? `/${recipe.img}` : `${recipe.img}`}"></div>
    </article>
</a>`;