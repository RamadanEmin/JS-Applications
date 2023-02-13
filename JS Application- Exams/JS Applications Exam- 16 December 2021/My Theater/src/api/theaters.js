import * as api from './api.js';

const endpoints = {
    allTheaters: '/data/theaters?sortBy=_createdOn%20desc&distinct=title'
};

export async function getAllTheaters() {
    return api.get(endpoints.allTheaters);
}