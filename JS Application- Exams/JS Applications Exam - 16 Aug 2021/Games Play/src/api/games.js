import * as api from './api.js';

const endpoints = {
    recent: '/data/games?sortBy=_createdOn%20desc&distinct=category',
    games: '/data/games?sortBy=_createdOn%20desc',
};

export async function getRecent() {
    return api.get(endpoints.recent);
}

export async function getAll() {
    return api.get(endpoints.games);
}