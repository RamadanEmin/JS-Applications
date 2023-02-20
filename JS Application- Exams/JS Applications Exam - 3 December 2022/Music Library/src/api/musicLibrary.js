import * as api from './api.js';

const endpoints = {
    allAlbums: '/data/albums?sortBy=_createdOn%20desc',
    addAlbum: '/data/albums'
};

export async function getAllAlbums() {
    return api.get(endpoints.allAlbums);
}

export async function addNewAlbum(data) {
    return api.post(endpoints.addAlbum, data);
}