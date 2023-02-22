import { html, nothing } from "../../node_modules/lit-html/lit-html.js";

export const catalogTemplate = (recipesInfo) => html`
<section id="catalog">
    <div class="section-title">
       ${searchForm()}
    </div>
    <header class="section-title"> ${pager(recipesInfo.page, recipesInfo.pages)} </header>
     ${recipesInfo.recipes.length > 0
     ? html`${recipesInfo.recipes.map(recipePreview)}`
     : html`<h1>No recipes yet...</h1>`
    }
    <footer class="section-title">${pager(recipesInfo.page, recipesInfo.pages)}</footer>
</section>`;

const recipePreview = (recipe) => html`
<a class="card" href=${`/details/${recipe._id}`}> <article class="preview">
    <div class="title">
        <h2>${recipe.name}</h2>
    </div>
    <div class="small"><img src="${recipe.img.startsWith(`assets`) ? `/${recipe.img}` : `${recipe.img}`}"></div>
    </article>
</a>`;

const searchForm = () => html`
    <form id="searchForm">
        <input type="text" name="search">
        <input type="submit" value="Search">
    </form>
`;

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
    }
`;