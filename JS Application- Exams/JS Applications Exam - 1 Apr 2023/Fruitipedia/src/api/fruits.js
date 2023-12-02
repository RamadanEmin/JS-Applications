import * as api from './api.js';

const endpoints = {
    getAll: '/data/fruits?sortBy=_createdOn%20desc',
    create: '/data/fruits'
};

export async function getAllFruits() {
    return api.get(endpoints.getAll);
}

export async function addNewFruit(data) {
    return api.post(endpoints.create, data);
}