import * as api from './api.js';

const endpoints = {
    allPets: '/data/pets?sortBy=_createdOn%20desc&distinct=name'
};

export async function getAllPets() {
    return api.get(endpoints.allPets);
}