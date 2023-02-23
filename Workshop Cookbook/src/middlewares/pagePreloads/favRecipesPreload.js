import { getFavouritesAndPages } from "../../services/favouriteService.js";
import { getTotalLikes } from "../../services/likesService.js";

export const preloadFavRecipesData = async (ctx, next) => {
    let params = new URLSearchParams(ctx.querystring);
    let page = Number(params.get(`page`)) || 1;
    ctx.recipesInfo = await getFavouritesAndPages(page, ctx.userData._id);
    for (let recipe of ctx.recipesInfo.recipes) {
        let likes = await getTotalLikes(recipe.recipeId);
        recipe.likes = likes;
    }
    ctx.page = page;
    next();
}