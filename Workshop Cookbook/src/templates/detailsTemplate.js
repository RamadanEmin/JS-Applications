import { html, nothing } from "../../node_modules/lit-html/lit-html.js";

export const detailsTemplate = (
recipe, 
isOwner, 
onDelete, 
ctx, 
user, 
totalLikes, 
likeRecipe, 
isLikedAlready,
removeLike,
isAmongFavouriteRecipes,
addToFavourite,
removeFromFavourite,
favouriteRecipes) => html`
<section id="details">
    ${recipeCard(recipe, isOwner, onDelete, ctx,user, totalLikes, likeRecipe, isLikedAlready, removeLike, isAmongFavouriteRecipes, addToFavourite, removeFromFavourite, favouriteRecipes)}
</section>`;

const recipeCard = (recipe, isOwner, onDelete, ctx, user, totalLikes, likeRecipe, isLikedAlready, removeLike, isAmongFavouriteRecipes, addToFavourite, removeFromFavourite, favouriteRecipes) => html`
<article>
    <h2>${recipe.name}</h2>
    <div class="band">
    ${user && !isOwner
    ? html`${isAmongFavouriteRecipes
       ? html`<a id="unfavouriteBtn" class="actionLink" href="javascript:void(0)" @click = ${function(e){removeFromFavourite(e, ctx, favouriteRecipes, recipe)}}><img src = "../../assets/unfavourite-icon.png" width=20 height=20> Unfavourite</a>`
       : html`<a id="favouriteBtn" class="actionLink" href="javascript:void(0)" @click = ${function(e){addToFavourite(e, ctx, recipe)}}><img src = "../../assets/balloon-heart.svg" width=20 height=20> Favourite</a>`
    }`
    : nothing}
        <div class="thumb"><img src="${recipe.img.startsWith(`assets`) ? `/${recipe.img}` : `${recipe.img}`}"></div>
        <div class="ingredients">
            <h3>Ingredients:</h3>
            <ul>
                ${recipe.ingredients.map(ingredient => html`<li>${ingredient}</li>`)}
            </ul>
        </div>
    </div>
    <div class="description">
        <h3>Preparation:</h3>
        ${recipe.steps.map(step => html`<p>${step}</p>`)}
    </div>
    
    ${user
     ? html`${isOwner
        ? html`
           <div class="controls">
               <a class="actionLink" href=${'/edit/' + recipe._id}>\u270E Edit</a>
               <a class="actionLink" href="javascript:void(0)" @click=${function(e){onDelete(e, ctx)}}>\u2716 Delete</a>
           </div>`
        : html` 
        ${isLikedAlready
              ? html`<a id="unlikeBtn" class="actionLink" href="javascript:void(0)" @click = ${function(e){removeLike(e, ctx)}}><img src = "../../assets/thumbs-down.svg" width=20 height=20> Unlike</a>`
              : html`<a id="likeBtn" class="actionLink" href="javascript:void(0)" @click = ${function(e){likeRecipe(e, ctx)}}><img src = "../../assets/thumbs-up.svg" width=20 height=20> Like</a>`
             }`
        }`
    : nothing}
</article>`;