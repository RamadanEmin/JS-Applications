import { apiRequests } from "../services/api.js";

const endpoints = {
    LIKES: `data/likes`,
    LIKE_BY_ID: `data/likes/`
};

export const likeRecipe = async (recipeId) => {
    let like = await apiRequests.post(endpoints.LIKES, { recipeId });
    return like;
}

export async function getTotalLikes(recipeId) {
    let querystring = `?where=recipeId%3D%22${encodeURIComponent(recipeId)}%22&distinct=_ownerId&count`;
    let likes = await apiRequests.get(`${endpoints.LIKES}${querystring}`);
    return likes;
}

export async function ifUserLikedAlready(recipeId, userId) {
    let querystring = `?where=recipeId%3D%22${encodeURIComponent(recipeId)}%22%20and%20_ownerId%3D%22${encodeURIComponent(userId)}%22&count`;
    let likedAlready = await apiRequests.get(`${endpoints.LIKES}${querystring}`);
    return likedAlready;
}

export const unlikeRecipe = async (likeId) => {
    await apiRequests.del(endpoints.LIKES + `/${likeId}`);
}

export const getSpecificLike = async () => {
    let query = `?distinct=_ownerId`;
    let like = await apiRequests.get(endpoints.LIKES + query);
    return like;
}