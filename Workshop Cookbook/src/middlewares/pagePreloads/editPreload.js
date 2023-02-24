import { singleRecipe, editRecipe } from "../../services/cookbookServices.js";
import { validateInputs } from "../../utils/Validate-Input-Fields.js";

export const preloadEditData = async (ctx, next) => {
    ctx.recipe = await singleRecipe(ctx.params.recipeId)
    ctx.edit = edit
    next()
}

const edit = async (e, ctx) => {
    e.preventDefault()
    let { name, img, ingredients, steps } = Object.fromEntries(new FormData(e.currentTarget))
    let isInfoCorrect = validateInputs([name, img, ingredients, steps])

    if (isInfoCorrect) {
        let isIngredientsCorrect = Boolean(ingredients.split(`\n`).length >= 3)
        let isStepsCorrect = Boolean(steps.split(`\n`).length >= 3)
        if (isIngredientsCorrect && isStepsCorrect) {
            await editRecipe(ctx.params.recipeId, {
                name,
                img,
                ingredients: ingredients.split(`\n`).map(ingredient => ingredient.trim()).filter(ingredient => ingredient !== ``),
                steps: steps.split(`\n`).map(step => step.trim()).filter(step => step !== ``)
            });
            ctx.showNotification(`Recipe: ${name}, updated!`, `infoBox`);
            e.target.reset();
            ctx.page.redirect(`/details/${ctx.params.recipeId}`);
        }
        else {
            if (!isIngredientsCorrect && !isStepsCorrect) {
                ctx.showNotification(`Ingredients and Steps must be atleast 3 in number!`, `errorBox`);
                return;
            }
            else if (!isIngredientsCorrect) {
                ctx.showNotification(`Ingredients must be atleast 3 in number!`, `errorBox`);
                return;
            }
            else if (!isStepsCorrect) {
                ctx.showNotification(`Steps must be atleast 3 in number!`, `errorBox`);
                return;
            }
        }
    }
    else {
        ctx.showNotification(`Please fill all fields!`, `errorBox`); 
        return;
    }
}