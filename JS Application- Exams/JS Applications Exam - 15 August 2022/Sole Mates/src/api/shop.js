import * as api from './api.js';

const endpoints = {
    shoeById: '/data/shoes/',
    allShoes: '/data/shoes?sortBy=_createdOn%20desc',
    add: '/data/shoes'
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