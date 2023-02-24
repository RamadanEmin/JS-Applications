import { createPointer } from './data.js';
import * as api from './api.js';

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