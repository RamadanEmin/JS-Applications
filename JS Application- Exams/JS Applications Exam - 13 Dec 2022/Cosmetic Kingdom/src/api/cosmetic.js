import * as api from './api.js';

const endpoints = {
    allProducts: '/data/products?sortBy=_createdOn%20desc',
    add: '/data/products'
};

export async function getAllProducts() {
    return api.get(endpoints.allProducts);
}

export async function addNewProduct(data) {
    return api.post(endpoints.add, data);
}