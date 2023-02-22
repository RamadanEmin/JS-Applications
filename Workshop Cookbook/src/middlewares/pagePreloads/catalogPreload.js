import { getAllRecipes } from "../../services/cookbookServices.js";

export async function preloadCatalogData(ctx, next) {
    let searchValue = localStorage.getItem(`searchValue`);
    if (searchValue) {
        ctx.searchValue = JSON.parse(searchValue).search.trim();
    }
    let params = new URLSearchParams(ctx.querystring);
    let page = Number(params.get(`page`)) || 1;
    ctx.recipesInfo = ctx.searchValue ? await getAllRecipes(page, ctx.searchValue) : await getAllRecipes(page);
    ctx.recipesInfo.page = page;
    
    localStorage.removeItem(`searchValue`);
    next();
}