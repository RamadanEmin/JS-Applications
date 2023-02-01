import createApi from './api.js';

const api = createApi(null, null, (msg) => alert(msg));

const endpoints = {
    RECENT_RECIPES: 'data/recipes?select=' + encodeURIComponent('_id,name,img') + '&sortBy=' + encodeURIComponent('_createdOn desc'),
};

export async function getRecent() {
    return await api.get(endpoints.RECENT_RECIPES);
}