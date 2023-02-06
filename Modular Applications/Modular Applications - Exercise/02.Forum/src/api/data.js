import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    topics: `/data/topics?select=_id,title,_ownerId&load=${encodeURIComponent('author=_ownerId:users')}`,
    topicCount: '/data/topics?count',
    createTopic: '/data/topics',
    createComment: '/data/topicComments'
};

export async function getAllTopics() {
    return api.get(endpoints.topics);
}

export async function getTopicCount() {
    return api.get(endpoints.topicCount);
}

export async function createTopic(topic) {
    return api.post(endpoints.createTopic, topic);
}
