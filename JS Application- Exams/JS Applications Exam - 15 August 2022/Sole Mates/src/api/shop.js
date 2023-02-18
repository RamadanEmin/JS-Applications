import * as api from './api.js';

const endpoints = {
    allShoes: '/data/shoes?sortBy=_createdOn%20desc',
    add: '/data/shoes'
};

export async function getAllShoes() {
    return api.get(endpoints.allShoes);
}

export async function addShoe(data) {
    return api.post(endpoints.add, data);
}