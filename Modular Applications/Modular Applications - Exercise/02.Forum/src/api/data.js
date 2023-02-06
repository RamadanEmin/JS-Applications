import * as api from './api.js';

const endpoints = {
    topicCount: '/data/topics?count',
};

export async function getTopicCount() {
    return api.get(endpoints.topicCount);
}