import { apiRequests } from "./api.js";
const pageSize = 5;
const url = `data/favourites`;

export const addFavourite = async (data) => {
   let resp = await apiRequests.post(url, data);
   return resp;
}

export const getFavourite = async (userId, count, pagination, page) => {
   let query = `?where=_ownerId%3D%22${encodeURIComponent(userId)}%22&sortBy=_createdOn%20desc`;
   if (count) {
      query += `&count`;
   }
   if (pagination) {
      query += `&pageSize=${pageSize}&offset=${(page - 1) * pageSize}`;
   }
   let resp = await apiRequests.get(url + query);
   if (resp.status == 404) {
      return [];
   }
   return resp;
}

export const removeFavourite = async (recipeId) => {
   await apiRequests.del(url + `/${recipeId}`);
}

export const getFavouritesAndPages = async (page, userId) => {
   let [favRecipes, favRecipesCount] = await Promise.all([
      getFavourite(userId, false, true, page),
      getFavourite(userId, true)
   ])
   return {
      recipes: favRecipes,
      pages: Math.ceil(Number(favRecipesCount) / pageSize)
   }
}