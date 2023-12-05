import * as api from './api.js';

const endpoints = {
    getAll: '/data/characters?sortBy=_createdOn%20desc',
    create: '/data/characters',
};

export async function getAllCharacters() {
    return api.get(endpoints.getAll);
}

export async function addNewCharacter(data) {
    return api.post(endpoints.create, data);
}