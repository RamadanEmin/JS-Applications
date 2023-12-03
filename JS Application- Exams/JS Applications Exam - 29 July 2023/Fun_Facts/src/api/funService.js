import * as api from './api.js';

const endpoints = {
    getAll: '/data/facts?sortBy=_createdOn%20desc',
    create: '/data/facts'
};

export async function getAllFacts() {
    return api.get(endpoints.getAll);
}

export async function addNewFact(data) {
    return api.post(endpoints.create, data);
}