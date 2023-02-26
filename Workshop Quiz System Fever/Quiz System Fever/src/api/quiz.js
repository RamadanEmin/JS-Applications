import * as api from './api.js';
import { addOwner, createPointer, } from './data.js';
import { getSolutionCount } from './solutions.js';


export async function getQuizes() {
    const quizes = (await api.get('/classes/Quiz')).results;
    const taken = await getSolutionCount(quizes.map(q => q.objectId));
    quizes.forEach(q => q.taken = taken[q.objectId]);
    return quizes;
}

export async function getQuizById(id) {
    return api.get('/classes/Quiz/' + id + '?include=owner');
}

export async function getQuizByOwner(userId) {
    const query = JSON.stringify({ owner: createPointer('_User', userId) });
    const response = await api.get('/classes/Quiz?where=' + encodeURIComponent(query));
    return response.results;
}

export async function getStats() {
    return (await api.get('/classes/Quiz?count=1&limit=1')).count;
}

export async function getMostRecentQuiz() {
    const quiz = (await api.get('/classes/Quiz?order=-createdAt&limit=1')).results[0];
    if (quiz) {
        const taken = await getSolutionCount([quiz.objectId]);
        quiz.taken = taken[quiz.objectId];
    }

    return quiz;
}

export async function createQuiz(quiz) {
    const body = addOwner(quiz);
    return api.post('/classes/Quiz', body);
}

export async function updateQuiz(id, quiz) {
    return api.put('/classes/Quiz/' + id, quiz);
}

export async function deleteQuiz(id) {
    return api.del('/classes/Quiz/' + id);
}