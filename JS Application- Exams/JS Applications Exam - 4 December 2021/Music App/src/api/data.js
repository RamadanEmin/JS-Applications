import * as api from './api.js';

const endpoints = {
    allAlbums: '/data/albums?sortBy=_createdOn%20desc&distinct=name',
    albumById: '/data/albums/',
    crete: '/data/albums',
    update: '/data/albums/',
    delete: '/data/albums/',
    search: '/data/albums?where='
};

export async function getAllAlbums() {
    return api.get(endpoints.allAlbums);
}

export async function getAlbumById(id) {
    return api.get(endpoints.albumById + id);
}

export async function searchAlbums(searchText) {
    return api.get(endpoints.search + encodeURIComponent(`name LIKE "${searchText}"`));
}

export async function createAlbum(data) {
    return api.post(endpoints.crete, data);
}

export async function updateAlbum(id, data) {
    return api.put(endpoints.update + id, data);
}

export async function deleteAlbumById(id) {
    return api.del(endpoints.delete + id);
}