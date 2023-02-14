import * as api from './api.js';

const endpoints = {
    allTheaters: '/data/theaters?sortBy=_createdOn%20desc&distinct=title',
    theaterById: '/data/theaters/',
    profile: (userId) => `/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    create: '/data/theaters',
    delete: '/data/theaters/'
};

export async function getAllTheaters() {
    return api.get(endpoints.allTheaters);
}

export async function getTheaterById(id) {
    return api.get(endpoints.theaterById + id);
}

export async function getProfile(userId) {
    return api.get(endpoints.profile(userId));
}

export async function createEvent(data) {
    return api.post(endpoints.allTheaters, data);
}

export function deleteEvent(id) {
    return api.del(endpoints.delete + id);
}