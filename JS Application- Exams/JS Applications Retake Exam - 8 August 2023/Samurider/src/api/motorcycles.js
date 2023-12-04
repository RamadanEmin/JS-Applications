import * as api from './api.js';

const endpoints = {
    getOne: '/data/motorcycles/',
    getAll: '/data/motorcycles?sortBy=_createdOn%20desc',
    create: '/data/motorcycles',
    update: '/data/motorcycles/',
    delete: '/data/motorcycles/',
};

export async function getMotorcycle(motorcycleId) {
    return api.get(endpoints.getOne + motorcycleId);
}

export async function getAllMotorcycles() {
    return api.get(endpoints.getAll);
}

export async function addNewMotorcycle(data) {
    return api.post(endpoints.create, data);
}

export async function updateMotorcycle(motorcycleId, data) {
    return api.put(endpoints.update + motorcycleId, data);
}

export async function deleteMotorcycle(motorcycleId) {
    return api.del(endpoints.delete + motorcycleId);
}