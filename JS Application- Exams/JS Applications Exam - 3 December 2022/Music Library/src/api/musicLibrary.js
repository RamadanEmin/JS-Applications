import * as api from './api.js';

const endpoints = {
    albumById: '/data/albums/',
    allAlbums: '/data/albums?sortBy=_createdOn%20desc',
    addAlbum: '/data/albums',
    update: '/data/albums/',
    delete: '/data/albums/',
    add: '/data/likes',
    likes: (albumId) => `/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`,
    like: (albumId, userId) => `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`
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

export async function updateAlbum(albumId, data) {
    return api.put(endpoints.update + albumId, data);
}

export async function deleteAlbum(albumId) {
    return api.del(endpoints.delete + albumId);
}

export async function addLike(data) {
    return api.post(endpoints.add, data);
}

export async function getLikeById(albumId, userId) {
    return api.get(endpoints.like(albumId, userId));
}

export async function getAllLikes(albumId) {
    return api.get(endpoints.likes(albumId));
}