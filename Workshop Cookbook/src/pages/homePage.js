import { homeTemplate } from "../templates/homeTemplate.js";

export async function homeView(ctx) {
  ctx.renderTemplate(homeTemplate(ctx.recentRecipes, ctx.userData));
}
