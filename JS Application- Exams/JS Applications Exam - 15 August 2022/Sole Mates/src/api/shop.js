import * as api from './api.js';

const endpoints = {
    shoeById: '/data/shoes/',
    allShoes: '/data/shoes?sortBy=_createdOn%20desc',
    add: '/data/shoes',
    update: '/data/shoes/',
    delete: '/data/shoes/'
};

export async function getShoeById(shoeId) {
    return api.get(endpoints.shoeById + shoeId);
}

export async function getAllShoes() {
    return api.get(endpoints.allShoes);
}

export async function addShoe(data) {
    return api.post(endpoints.add, data);
}

export async function updateShoe(shoeId, data) {
    return api.put(endpoints.update + shoeId, data);
}

export async function deleteShoe(shoeId) {
    return api.del(endpoints.delete + shoeId);
}