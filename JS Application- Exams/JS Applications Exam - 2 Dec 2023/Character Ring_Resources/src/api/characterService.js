import * as api from './api.js';

const endpoints = {
    getOne: '/data/characters/',
    getAll: '/data/characters?sortBy=_createdOn%20desc',
    create: '/data/characters',
    delete: '/data/characters/',
    like: '/data/useful',
    totalLikes: (characterId) => `/data/useful?where=characterId%3D%22${characterId}%22&distinct=_ownerId&count`,
    userLike: (characterId, userId) => `/data/useful?where=characterId%3D%22${characterId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

export async function getCharacter(characterId) {
    return api.get(endpoints.getOne + characterId);
}

export async function getAllCharacters() {
    return api.get(endpoints.getAll);
}

export async function addNewCharacter(data) {
    return api.post(endpoints.create, data);
}

export async function deleteCharacter(characterId) {
    return api.del(endpoints.delete + characterId);
}

export async function addLike(characterId) {
    return api.post(endpoints.like, characterId);
}

export async function getTotalLikes(characterId) {
    return api.get(endpoints.totalLikes(characterId));
}

export async function getLikesFromUser(characterId, userId) {
    return api.get(endpoints.userLike(characterId, userId));
}