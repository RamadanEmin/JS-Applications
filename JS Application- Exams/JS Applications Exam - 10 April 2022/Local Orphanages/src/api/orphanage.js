import * as api from './api.js';

const endpoints = {
    allMaterials: '/data/posts?sortBy=_createdOn%20desc',
    materialById: '/data/posts/',
    myPosts: (userId) => `/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    create: '/data/posts',
    delete: '/data/posts/',
    make: '/data/donations',
    totalDonation: (postId) => `/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`,
    donationById: (postId, userId) => `/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

export async function getAllMaterials() {
    return api.get(endpoints.allMaterials);
}

export async function getMaterialById(id) {
    return api.get(endpoints.materialById + id);
}

export async function getMyPosts(userId) {
    return api.get(endpoints.myPosts(userId));
}

export async function createMaterial(data) {
    return api.post(endpoints.create, data);
}

export async function deleteMaterial(id) {
    return api.del(endpoints.delete + id);
}

export async function makeDonation(data) {
    return api.post(endpoints.make, data);
}

export async function getTotalDonation(postId) {
    return api.get(endpoints.totalDonation(postId));
}

export async function getDonationById(postId, userId) {
    return api.get(endpoints.donationById(postId, userId));
}