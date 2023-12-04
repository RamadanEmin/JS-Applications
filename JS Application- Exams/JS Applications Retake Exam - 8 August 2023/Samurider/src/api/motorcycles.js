import * as api from './api.js';

const endpoints = {
    getAll: '/data/motorcycles?sortBy=_createdOn%20desc',
    create: '/data/motorcycles',
};

export async function getAllMotorcycles() {
    return api.get(endpoints.getAll);
}

export async function addNewMotorcycle(data) {
    return api.post(endpoints.create, data);
}