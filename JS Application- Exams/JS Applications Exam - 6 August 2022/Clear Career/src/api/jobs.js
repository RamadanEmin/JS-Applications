import * as api from './api.js';

const endpoints = {
    offerById : '/data/offers/',
    allOffers: '/data/offers?sortBy=_createdOn%20desc',
    create: '/data/offers',
    update : '/data/offers/',
    delete : '/data/offers/',
    addAppl : '/data/applications',
    totalAppl : (offerId) => `/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`,
    applByID : (offerId, userId) => `/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

export async function getOfferById(offerId) {
    return api.get(endpoints.offerById + offerId);
}

export async function getAllOffers() {
    return api.get(endpoints.allOffers);
}

export async function createNewOffer(data) {
    return api.post(endpoints.create, data);
}

export async function updateOffer(offerId, data) {
    return api.put(endpoints.update + offerId, data);
}

export async function deleteOffer(offerId) {
    return api.del(endpoints.delete + offerId);
}

export async function addAplication(data) {
    return api.post(endpoints.addAppl, data);
}

export async function getTotalApplicationsCount(offerId) {
    return api.get(endpoints.totalAppl(offerId));
}

export async function getApplicationsById(offerId, userId) {
    return api.get(endpoints.applByID(offerId, userId));
}