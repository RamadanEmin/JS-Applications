import { apiRequests } from "./api.js";

const pageSize = 5;
const endpoints = {
    getThreeRecent: 'data/recipes?select=' + encodeURIComponent('_id,name,img') + '&sortBy=' + encodeURIComponent('_createdOn desc') + `&pageSize=3`,
    getAllRecipes: 'data/recipes?select=' + encodeURIComponent('_id,name,img'),
    getAllRecipesCount: 'data/recipes?count',
    addRecipe: `data/recipes`,
    singleRecipe: `data/recipes/`,
    deleteRecipe: `data/recipes/`,
    editRecipe: `data/recipes/`,
    commentsForRecipe: 'data/comments?where=' + encodeURIComponent('recipeId='),
    postComment: `data/comments`,
    commentById: `data/comments/`,
    getAllComments: `data/comments`,
    getCommentAuthor: `data/comments?where=`,
    searchRecipes: 'data/recipes?select=' + encodeURIComponent('_id,name,img'),
    recipesAddedByUser: 'data/recipes?where='
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

export async function singleRecipe(recipeId) {
    let recipe = await apiRequests.get(`${endpoints.singleRecipe}${recipeId}`);
    return recipe;
}

export async function deleteRecipe(recipeId) {
    await apiRequests.del(`${endpoints.deleteRecipe}${recipeId}`);
}

export async function editRecipe(recipeId, data) {
    let editedRecipe = await apiRequests.put(`${endpoints.editRecipe}${recipeId}`, data);
    return editedRecipe;
}

export async function getCommentsForRecipe(recipeId) {
    let comments = await apiRequests.get(`${endpoints.getAllComments}?where=recipeId%3D%22${encodeURIComponent(recipeId)}%22`);
    return comments;
}

export async function postComment(data) {
    let newComment = await apiRequests.post(endpoints.postComment, data);
    return newComment;
}

export async function getCommentAuthor(recipeId) {
    let author = await apiRequests.get(`${endpoints.getCommentAuthor}recipeId%3D${encodeURIComponent(`"${recipeId}"`)}&load=author%3D_ownerId%3Ausers`);
    return author;
}

export async function getRecipesMadeByUser(page = 1, userId) {
    let [recipes, recipesCount] = await Promise.all([
        apiRequests.get(`${endpoints.recipesAddedByUser}_ownerId%3D%22${encodeURIComponent(userId)}%22&sortBy=_createdOn%20descgeSize=${pageSize}&offset=${(page - 1) * pageSize}`),
        apiRequests.get(`${endpoints.recipesAddedByUser}_ownerId%3D%22${encodeURIComponent(userId)}%22&count`)
    ]);
    return { recipes, pages: Math.ceil(Number(recipesCount) / pageSize) };
}
