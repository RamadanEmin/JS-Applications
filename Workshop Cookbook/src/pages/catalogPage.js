import { catalogTemplate } from "../templates/catalogTemplate.js";

export const catalogView = (ctx) => {
    ctx.renderTemplate(catalogTemplate(ctx.recipesInfo));
    const searchForm = document.querySelector(`#searchForm`);
    const submitHandler = function (e) {
        search(e, ctx);
    }
    searchForm.addEventListener(`submit`, submitHandler);
}

const search = (e, ctx) => {
    e.preventDefault();
    let { search } = Object.fromEntries(new FormData(e.currentTarget));
    if (search !== ``) {
        localStorage.setItem(`searchValue`, JSON.stringify({ search }));
        ctx.page.redirect('/catalog');
    }
    else {
        ctx.showNotification(`Please enter a recipe name to search..`, `infoBox`);
        return;
    }
}