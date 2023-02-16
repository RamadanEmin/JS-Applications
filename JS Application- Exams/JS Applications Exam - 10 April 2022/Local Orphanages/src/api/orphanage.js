import * as api from './api.js';

const endpoints = {
    allMaterials: '/data/posts?sortBy=_createdOn%20desc',
    myPosts: (userId) => `/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    create: '/data/posts',
};

export async function getAllMaterials() {
    return api.get(endpoints.allMaterials);
}

export async function getMyPosts(userId) {
    return api.get(endpoints.myPosts(userId));
}

export async function createMaterial(data) {
    return api.post(endpoints.create, data);
}