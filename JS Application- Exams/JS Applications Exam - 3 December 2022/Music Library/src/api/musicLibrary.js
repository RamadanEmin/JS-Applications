import * as api from './api.js';

const endpoints = {
    albumById: '/data/albums/',
    allAlbums: '/data/albums?sortBy=_createdOn%20desc',
    addAlbum: '/data/albums',
};

export async function getAlbum(albumId) {
    return api.get(endpoints.albumById + albumId);
}

export async function getAllAlbums() {
    return api.get(endpoints.allAlbums);
}

export async function addNewAlbum(data) {
    return api.post(endpoints.addAlbum, data);
}