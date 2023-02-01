import createApi from './api.js';

const api = createApi(null, null, (msg) => alert(msg));

const endpoints = {
    RECIPE_LIST: 'data/recipes?select=' + encodeURIComponent('_id,name,img'),
    RECIPE_COUNT: 'data/recipes?count',
    RECENT_RECIPES: 'data/recipes?select=' + encodeURIComponent('_id,name,img') + '&sortBy=' + encodeURIComponent('_createdOn desc'),
};

export async function getRecipes(page = 1, search) {
    let url = endpoints.RECIPE_LIST + `&offset=${(page - 1) * 5}&pageSize=5`;
    if (search) {
        url += '&where=' + encodeURIComponent(`name like "${search}"`);
    }
    return await api.get(url);
}

export async function getRecipeCount(search) {
    let url = endpoints.RECIPE_COUNT;
    if (search) {
        url += '&where=' + encodeURIComponent(`name like "${search}"`);
    }
    return await api.get(endpoints.RECIPE_COUNT);
}

export async function getRecent() {
    return await api.get(endpoints.RECENT_RECIPES);
}