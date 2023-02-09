import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    memeById: '/data/memes/',
    myMemes: (userId) => `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    allMemes: '/data/memes?sortBy=_createdOn%20desc',
    createMeme: '/data/memes',
    delById: '/data/memes/',
    editById: '/data/memes/'
};

export async function getMemeByID(id) {
    return api.get(endpoints.memeById + id);
}

export async function getMyMemes(userId) {
    return api.get(endpoints.myMemes(userId));
}

export async function getAllMemes() {
    return api.get(endpoints.allMemes);
}

export async function createMeme(meme) {
    return api.post(endpoints.createMeme, meme);
}

export async function deleteById(id) {
    return api.del(endpoints.delById + id);
}

export async function editMeme(id, meme) {
    return api.put(endpoints.editById + id, meme);
}