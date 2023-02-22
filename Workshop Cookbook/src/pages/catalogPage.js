import { catalogTemplate } from "../templates/catalogTemplate.js";

export const catalogView = (ctx) => {
    ctx.renderTemplate(catalogTemplate(ctx.recipesInfo));
}