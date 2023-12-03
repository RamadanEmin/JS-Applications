import * as api from './api.js';

const endpoints = {
    getOne: '/data/facts/',
    getAll: '/data/facts?sortBy=_createdOn%20desc',
    create: '/data/facts'
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