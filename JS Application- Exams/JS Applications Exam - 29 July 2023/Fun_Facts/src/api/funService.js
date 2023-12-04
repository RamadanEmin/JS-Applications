import * as api from './api.js';

const endpoints = {
    getOne: '/data/facts/',
    getAll: '/data/facts?sortBy=_createdOn%20desc',
    create: '/data/facts',
    delete: '/data/facts/',
    like: '/data/likes',
    totalLikes: (factId) => `/data/likes?where=factId%3D%22${factId}%22&distinct=_ownerId&count`,
    userLikes: (factId, userId) => `/data/likes?where=factId%3D%22${factId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

export async function getfact(factId) {
    return api.get(endpoints.getOne + factId);
}

export async function getAllFacts() {
    return api.get(endpoints.getAll);
}

export async function addNewFact(data) {
    return api.post(endpoints.create, data);
}

export async function deleteFact(factId) {
    return api.del(endpoints.delete + factId);
}

export async function addLike(factId) {
    return api.post(endpoints.like, factId);
}

export async function getLikes(factId) {
    return api.get(endpoints.totalLikes(factId));
}

export async function likeFromUser(factId, userId) {
    return api.get(endpoints.userLikes(factId, userId));
}