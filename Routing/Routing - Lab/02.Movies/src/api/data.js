import * as api from './api.js';

const endpoints = {
    allMovies: `/data/movies`,
}

export async function getAllMovies() {
    return api.get(endpoints.allMovies);
}
