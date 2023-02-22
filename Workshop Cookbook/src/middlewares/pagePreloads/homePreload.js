import { getThreeRecent } from "../../services/cookbookServices.js"

export async function preloadHomeData(ctx, next){
    ctx.recentRecipes = await getThreeRecent()
    next()
}