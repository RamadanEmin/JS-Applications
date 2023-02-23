import { favRecipesTemplate } from "../templates/favouriteRecipesTemplate.js";

export const favRecipesView = (ctx) => {
    ctx.renderTemplate(favRecipesTemplate(ctx.recipesInfo.recipes, ctx.userData.email, ctx.recipesInfo.pages, ctx.page));
}
