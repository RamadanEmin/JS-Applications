import * as api from './api.js';

const endpoints = {
    product: '/data/products/',
    allProducts: '/data/products?sortBy=_createdOn%20desc',
    add: '/data/products',
    update: '/data/products/',
    delete: '/data/products/',
    buy: '/data/bought',
    pressed: (productId, userId) => `/data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
    buys: (productId) => `/data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`
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

export async function updateProduct(productId, data) {
    return api.put(endpoints.update + productId, data);
}

export async function deleteProduct(productId) {
    return api.del(endpoints.delete + productId);
}

export async function addBuys(data) {
    return api.post(endpoints.buy, data);
}

export async function presetBuy(productId, userId) {
    return api.get(endpoints.pressed(productId, userId));
}

export async function getAllBuys(productId) {
    return api.get(endpoints.buys(productId));
}