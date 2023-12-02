import * as api from './api.js';

const endpoints = {
    getAllEvents: '/data/events?sortBy=_createdOn%20desc',
    create: '/data/events',
};


export async function getAllEvents() {
    return api.get(endpoints.getAllEvents);
}

export async function addNewEvent(data) {
    return api.post(endpoints.create, data);
}