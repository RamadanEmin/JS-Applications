import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    myMemes: (userId) => `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    allMemes: '/data/memes?sortBy=_createdOn%20desc'
};

export async function getMyMemes(userId) {
    return api.get(endpoints.myMemes(userId));
}

export async function getAllMemes() {
    return api.get(endpoints.allMemes);
}