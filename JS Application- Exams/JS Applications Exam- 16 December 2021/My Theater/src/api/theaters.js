import * as api from './api.js';

const endpoints = {
    allTheaters: '/data/theaters?sortBy=_createdOn%20desc&distinct=title',
    create: '/data/theaters'
};

export async function getAllTheaters() {
    return api.get(endpoints.allTheaters);
}

export async function createEvent(data) {
    return api.post(endpoints.allTheaters, data);
}