import { getRecipesMadeByUser } from "../../services/cookbookServices.js";
import { getTotalLikes } from "../../services/likesService.js";

export const preloadMyRecipesData = async (ctx, next) => {
    let searchParams = new URLSearchParams(ctx.querystring);
    let page = Number(searchParams.get(`page`)) || 1;
    ctx.recipesInfo = await getRecipesMadeByUser(page, ctx.userData._id);
    ctx.recipesInfo.page = page;
    for (let recipe of ctx.recipesInfo.recipes) {
        let likes = await getTotalLikes(recipe._id);
        recipe.likes = likes;
    }
    next();
}