import { getAllRecipes } from "../../services/cookbookServices.js";

export async function preloadCatalogData(ctx, next) {
  
    ctx.recipesInfo = await getAllRecipes(page);

    next();
}