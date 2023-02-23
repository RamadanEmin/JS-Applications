import { apiRequests } from "./api.js";

const pageSize = 5;
const endpoints = {
    getThreeRecent: 'data/recipes?select=' + encodeURIComponent('_id,name,img') + '&sortBy=' + encodeURIComponent('_createdOn desc') + `&pageSize=3`,
    getAllRecipes: 'data/recipes?select=' + encodeURIComponent('_id,name,img'),
    getAllRecipesCount: 'data/recipes?count',
    addRecipe: `data/recipes`
};

export async function getThreeRecent() {
    let recipes = await apiRequests.get(endpoints.getThreeRecent);
    return recipes;
}

export async function getAllRecipes(page = 1, searchValue) {
    let recipesUrl;
    let recipesCountUrl;
    if (searchValue) {
        recipesUrl = `${endpoints.getAllRecipes}&where=${encodeURIComponent(`name like "${searchValue}"`)}`;
        recipesUrl += `&offset=${(page - 1) * 5}&pageSize=${pageSize}`;

        recipesCountUrl = `data/recipes?where=${encodeURIComponent(`name like "${searchValue}"`)}&count`;
    }
    else {
        recipesUrl = `${endpoints.getAllRecipes}&offset=${(page - 1) * 5}&pageSize=${pageSize}`;
        recipesCountUrl = endpoints.getAllRecipesCount;
    }
    let [recipes, recipesCount] = await Promise.all([
        apiRequests.get(recipesUrl),
        apiRequests.get(recipesCountUrl)
    ]);
    return { recipes, pages: Math.ceil(Number(recipesCount) / pageSize) };
}

export async function addRecipe(data) {
    await apiRequests.post(endpoints.addRecipe, data);
}