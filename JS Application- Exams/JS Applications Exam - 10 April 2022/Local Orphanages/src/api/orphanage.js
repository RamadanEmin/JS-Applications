import * as api from './api.js';

const endpoints = {
    allMaterials: '/data/posts?sortBy=_createdOn%20desc',
    create: '/data/posts'
};

export async function getAllMaterials() {
    return api.get(endpoints.allMaterials);
}

export async function createMaterial(data) {
    return api.post(endpoints.create, data);
}