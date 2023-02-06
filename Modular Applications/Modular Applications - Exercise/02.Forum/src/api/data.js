import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    topicCount: '/data/topics?count',
    createTopic: '/data/topics'
};

export async function getTopicCount() {
    return api.get(endpoints.topicCount);
}

export async function createTopic(topic) {
    return api.post(endpoints.createTopic, topic);
}
