import * as api from './api.js';

const endpoints = {
    allListings: '/data/cars?sortBy=_createdOn%20desc',
    myListings: (userId) => `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    carById: '/data/cars/',
    create: '/data/cars',
};

export async function getAllListings() {
    return api.get(endpoints.allListings);
}

export async function getMyListings(userId) {
    return api.get(endpoints.myListings(userId));
}

export async function getCarById(id) {
    return api.get(endpoints.carById + id);
}

export async function createCar(data) {
    return api.post(endpoints.create, data);
}