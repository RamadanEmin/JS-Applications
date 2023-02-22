import { apiRequests } from "./api.js";

const endpoints = {
    getThreeRecent: 'data/recipes?select=' + encodeURIComponent('_id,name,img') + '&sortBy=' + encodeURIComponent('_createdOn desc') + `&pageSize=3`
};

export async function getThreeRecent() {
    let recipes = await apiRequests.get(endpoints.getThreeRecent);
    return recipes;
}