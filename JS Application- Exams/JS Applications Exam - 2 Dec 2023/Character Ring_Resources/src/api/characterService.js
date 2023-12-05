import * as api from './api.js';

const endpoints = {
    getOne: '/data/characters/',
    getAll: '/data/characters?sortBy=_createdOn%20desc',
    create: '/data/characters',
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