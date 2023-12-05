import * as api from './api.js';

const endpoints = {
    getAll: '/data/characters?sortBy=_createdOn%20desc',
};

export async function getAllCharacters() {
    return api.get(endpoints.getAll);
}