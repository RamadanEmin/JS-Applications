import * as api from './api.js';

const endpoints = {
    getOne: '/data/fruits/',
    getAll: '/data/fruits?sortBy=_createdOn%20desc',
    create: '/data/fruits',
};

export async function getFruit(fruitId) {
    return api.get(endpoints.getOne + fruitId);
}

export async function getAllFruits() {
    return api.get(endpoints.getAll);
}

export async function addNewFruit(data) {
    return api.post(endpoints.create, data);
}