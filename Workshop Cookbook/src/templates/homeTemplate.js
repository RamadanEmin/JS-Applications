import { html, nothing } from "../../node_modules/lit-html/lit-html.js";

export const homeTemplate = (recentRecipes) => html`
<section id="home">
    <div class="hero">
        <h2>Welcome to My Cookbook</h2>
    </div>
    <header class="section-title">Recently added recipes</header>
    <div class="recent-recipes">
        ${recentRecipes.map((recipe, index) => html`
            ${recentRecipe(recipe)}
            ${index !== 2
            ? html`<div class="recent-space"></div>`
            : nothing
            }`
        )}
    </div>
    <footer class="section-title">
        <p>Browse all recipes in the <a href="/catalog">Catalog</a></p>
    </footer>
     <footer class="section-title">
     <p><a href="/register">Sign up</a> and start cooking !</p>
     </footer>
</section>`;

const recentRecipe = (recipe) => html`
<a class="card" href= ${`/details/${recipe._id}`} >
    <article class="recent">
        <div class="recent-preview"><img src="${recipe.img.startsWith(`assets`) ? `/${recipe.img}` : `${recipe.img}`}"></div>
        <div class="recent-title">${recipe.name}</div>
    </article>
</a>`;