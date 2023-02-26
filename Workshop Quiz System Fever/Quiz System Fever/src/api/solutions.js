import { createPointer, addOwner } from './data.js';
import * as api from './api.js';

export async function getSolutionByUserId(userId) {
    const query = JSON.stringify({ owner: createPointer('_User', userId) });
    const response = await api.get('/classes/Solution?where=' + encodeURIComponent(query));
    return response.results;
}

export async function getSolutionByQuizId(quizId) {
    const query = JSON.stringify({ owner: createPointer('Quiz', quizId) });
    const response = await api.get('/classes/Solution?where=' + encodeURIComponent(query));
    return response.results;
}

export async function submitSolution(quizId, solution) {
    const body = addOwner(solution);
    body.quiz = createPointer('Quiz', quizId);
    return await api.post('/classes/Solution', body);
}

export async function getSolutionCount(quizIds) {
    const query = JSON.stringify({ $or: quizIds.map(id => ({ quiz: createPointer('Quiz', id) })) });
    const solutions = (await api.get('/classes/Solution?where=' + encodeURIComponent(query))).results;
    const result = solutions.reduce((a, c) => {
        const id = c.quiz.objectId;
        if (!a[id]) {
            a[id] = 0;
        }
        a[id]++;
        return a;
    }, {});

    return result;
}