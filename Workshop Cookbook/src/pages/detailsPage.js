import { detailsTemplate } from "../templates/detailsTemplate.js";

export const detailsView = (ctx) => {
    ctx.renderTemplate(detailsTemplate(
        ctx.recipe,
        ctx.isOwner,
        ctx.delete,
        ctx,
        ctx.comments,
        ctx.userData,
        ctx.addComment,
        ctx.totalLikes,
        ctx.postLike,
        ctx.likedAlready,
        ctx.removeLike,
        ctx.isAmongFavouriteRecipes,
        ctx.addToFavourite,
        ctx.removeFromFavourite,
        ctx.favouriteRecipes,
    ));
    if (!ctx.userData) {
        ctx.showNotification(`Log-in or Sign-up, to like and comment!`, `infoBox`);
    }
}