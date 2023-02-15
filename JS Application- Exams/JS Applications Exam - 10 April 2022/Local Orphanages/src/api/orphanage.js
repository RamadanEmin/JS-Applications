import * as api from './api.js';

const endpoints = {
    allMaterials: '/data/posts?sortBy=_createdOn%20desc'
};

export async function getAllMaterials() {
    return api.get(endpoints.allMaterials);
}