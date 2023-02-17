import * as api from './api.js';

const endpoints = {
    allOffers: '/data/offers?sortBy=_createdOn%20desc',
    create: '/data/offers'
};

export async function getAllOffers() {
    return api.get(endpoints.allOffers);
}

export async function createNewOffer(data) {
    return api.post(endpoints.create, data);
}