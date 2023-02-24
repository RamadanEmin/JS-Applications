import { singleRecipe, deleteRecipe, getCommentsForRecipe } from "../../services/cookbookServices.js";
import { getFavourite } from "../../services/favouriteService.js";
import { getSpecificLike, getTotalLikes, ifUserLikedAlready, likeRecipe, unlikeRecipe } from "../../services/likesService.js";
import { addFavourite, removeFavourite } from "../../services/favouriteService.js";
import { userOperations } from "../../services/user-services.js";

export const preloadDetailsData = async (ctx, next) => {
  let [totalLikes, recipe] = await Promise.all([
    getTotalLikes(ctx.params.recipeId),
    singleRecipe(ctx.params.recipeId)
  ]);

  ctx.totalLikes = totalLikes;
  ctx.recipe = recipe;
  ctx.userData ? ctx.isOwner = ctx.userData._id === ctx.recipe._ownerId : ctx.isOwner = false;
  ctx.delete = onDelete;
  ctx.postLike = postLike;
  ctx.removeLike = removeLike;

  if (ctx.userData) {
    let [likedAlready, favouriteRecipes, profilePic] = await Promise.all([
      ifUserLikedAlready(ctx.params.recipeId, ctx.userData._id),
      getFavourite(ctx.userData._id),
    ]);
    ctx.likedAlready = likedAlready;
    ctx.favouriteRecipes = favouriteRecipes;
  }

  if (ctx.favouriteRecipes) {
    ctx.isAmongFavouriteRecipes = ctx.favouriteRecipes.some(r => r.name === recipe.name);
    ctx.addToFavourite = addToFavourite;
    ctx.removeFrom = removeFromFavourite;
  }

  next();
}

const onDelete = async (e, ctx) => {
  e.preventDefault();
  let confirmDelete = confirm(`Are you sure you want to delete this recipe?`);
  if (confirmDelete) {
    await deleteRecipe(ctx.params.recipeId);
    ctx.showNotification(`Recipe: ${ctx.recipe.name} was deleted successfully!`, `infoBox`);
    ctx.page.redirect('/catalog');
  }
  else {
    return;
  }
}

const postLike = async (e, ctx) => {
  e.preventDefault();
  let likeInfo = await likeRecipe(ctx.params.recipeId);
  ctx.page.redirect(`/details/${ctx.params.recipeId}`);
}

const removeLike = async (e, ctx) => {
  e.preventDefault();
  let likeInfo = await getSpecificLike();
  await unlikeRecipe(likeInfo[0]._id);
  ctx.page.redirect(`/details/${ctx.params.recipeId}`);
}

const addToFavourite = async (e, ctx, recipe) => {
  e.preventDefault();
  recipe.recipeId = recipe._id;
  await addFavourite(recipe);
  ctx.showNotification(`${recipe.name}, successfully added to favourites!`, `infoBox`);
  ctx.page.redirect(`/details/${ctx.params.recipeId}`);
}

const removeFromFavourite = async (e, ctx, favouriteRecipes, currRecipe) => {
  e.preventDefault();
  let recipeId = favouriteRecipes.find(r => r.name == currRecipe.name)._id;
  await removeFavourite(recipeId);
  ctx.showNotification(`${currRecipe.name}, successfully removed from favourites!`, `infoBox`);
  ctx.page.redirect(`/details/${ctx.params.recipeId}`);
}