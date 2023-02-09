import * as api from './api.js';

export async function getAllBooks() {
    return api.get('/data/books?sortBy=_createdOn%20desc');
}