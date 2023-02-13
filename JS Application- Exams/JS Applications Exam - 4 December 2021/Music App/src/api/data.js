import * as api from './api.js';

const endpoints = {
    allAlbums: '/data/albums?sortBy=_createdOn%20desc&distinct=name',
    albumById: '/data/albums/',
    crete: '/data/albums'
};

export async function getAllAlbums() {
    return api.get(endpoints.allAlbums);
}

export async function getAlbumById(id) {
    return api.get(endpoints.albumById + id);
}

export async function createAlbum(data) {
    return api.post(endpoints.crete, data);
}