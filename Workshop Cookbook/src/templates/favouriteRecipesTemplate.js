import { html, nothing } from "../../node_modules/lit-html/lit-html.js";

export const favRecipesTemplate = (recipesInfo,userEmail,pages,currPage) => html`
<section id="fav-recipes">
    <div class="section-title">
        Favourite recipes of, ${userEmail} :
    </div>
    <header class="section-title"> ${pager(currPage, pages)} </header>
     ${recipesInfo.length > 0
     ? html`${recipesInfo.map(recipe => recipePreview(recipe))}`
     : html`<h1>No recipes yet...</h1>`
    }
    <footer class="section-title">${pager(currPage, pages)}</footer>
</section>`;

const recipePreview = (recipe) => html`
<a class="card" href=${`/details/${recipe.recipeId}`}> <article class="preview">
    <div class="title">
        <h2>${recipe.name}</h2>
        <span><img src="../../assets/thumbs-up-2.svg" height="50" width="50"> ${recipe.likes}</span>
    </div>
    <div class="small"><img src="${recipe.img.startsWith(`assets`) ? `/${recipe.img}` : `${recipe.img}`}"></div>
    </article>
</a>`;


const pager = (page,totalPages) => html`
    ${page === 1
    ? nothing
    :html`<a class="pager" href="/catalog/?page=${page - 1}">&lt;Prev</a>`
    }
    ${totalPages > 0
    ? `Page ${page} of ${totalPages}`
    : nothing
    }
    ${page + 1 > totalPages
      ? nothing
      : html`<a class="pager" href="/catalog/?page=${page + 1}">Next&gt;</a>` 
    }`;