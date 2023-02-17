import * as api from './api.js';

const endpoints = {
    allOffers: '/data/offers?sortBy=_createdOn%20desc'
};

export async function getAllOffers() {
    return api.get(endpoints.allOffers);
}