import * as api from './api.js';

const endpoints = {
    product: '/data/products/',
    allProducts: '/data/products?sortBy=_createdOn%20desc',
    add: '/data/products',
};

export async function getProduct(productId) {
    return api.get(endpoints.product + productId);
}

export async function getAllProducts() {
    return api.get(endpoints.allProducts);
}

export async function addNewProduct(data) {
    return api.post(endpoints.add, data);
}