import * as api from './api.js';

const endpoints = {
    allPets: '/data/pets?sortBy=_createdOn%20desc&distinct=name',
    create: '/data/pets',
};

export async function getAllPets() {
    return api.get(endpoints.allPets);
}

export async function createPet(data) {
    return api.post(endpoints.allPets, data);
}