import * as api from './api.js';

const endpoints = {
    allAlbums: '/data/albums?sortBy=_createdOn%20desc'
};

export async function getAllAlbums() {
    return api.get(endpoints.allAlbums);
}