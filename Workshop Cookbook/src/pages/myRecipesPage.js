import { myRecipesTemplate } from "../templates/myRecipesTemplate.js";

export const myRecipesView = (ctx) => {
    ctx.renderTemplate(myRecipesTemplate(ctx.recipesInfo, ctx.userData.email));
}