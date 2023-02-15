import * as api from './api.js';

const endpoints = {
    allPets: '/data/pets?sortBy=_createdOn%20desc&distinct=name',
    petById: '/data/pets/',
    create: '/data/pets',
    delete: '/data/pets/',
    add: '/data/donation',
    allDonationCount: (petId) => `/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`,
    donationById: (petId, userId) => `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

export async function getAllPets() {
    return api.get(endpoints.allPets);
}

export async function getPetById(id) {
    return api.get(endpoints.petById + id);
}

export async function createPet(data) {
    return api.post(endpoints.allPets, data);
}

export async function deletePet(id) {
    return api.del(endpoints.delete + id);
}

export async function addDonation(data) {
    return api.post(endpoints.add, data);
}

export async function getAllDonationCount(petId) {
    return api.get(endpoints.allDonationCount(petId));
}

export async function getDonationById(petId, userId) {
    return api.get(endpoints.donationById(petId, userId));
}