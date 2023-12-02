import * as api from './api.js';

const endpoints = {
    event: '/data/events/',
    getAllEvents: '/data/events?sortBy=_createdOn%20desc',
    create: '/data/events',
    delete: '/data/events/',
    people: '/data/going',
    total: (eventId) => `/data/going?where=eventId%3D%22${eventId}%22&distinct=_ownerId&count`,
    goings: (eventId, userId) => `/data/going?where=eventId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

export async function getEvent(eventId) {
    return api.get(endpoints.event + eventId);
}

export async function getAllEvents() {
    return api.get(endpoints.getAllEvents);
}

export async function addNewEvent(data) {
    return api.post(endpoints.create, data);
}

export async function deleteEvent(eventId) {
    return api.del(endpoints.delete + eventId);
}

export async function addPeople(data) {
    return api.post(endpoints.people, data);
}

export async function getTotal(eventId) {
    return api.get(endpoints.total(eventId));
}

export async function numberOfGoings(eventId, userId) {
    return api.get(endpoints.goings(eventId, userId));
}