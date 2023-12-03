import * as api from './api.js';

const endpoints = {
    getOne: '/data/fruits/',
    getAll: '/data/fruits?sortBy=_createdOn%20desc',
    create: '/data/fruits',
    update: '/data/fruits/',
    delete: '/data/fruits/',
    search:(query)=>`/data/fruits?where=name%20LIKE%20%22${query}%22`
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

export async function updateFruit(fruitId, data) {
    return api.put(endpoints.update + fruitId, data);
}

export async function deleteFruit(fruitId) {
    return api.del(endpoints.delete + fruitId);
}