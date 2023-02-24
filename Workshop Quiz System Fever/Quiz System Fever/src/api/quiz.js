import * as api from './api.js';
import { getSolutionCount } from './solutions.js';

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