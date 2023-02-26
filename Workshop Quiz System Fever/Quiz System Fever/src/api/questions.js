import { addOwner, createPointer } from './data.js';
import * as api from './api.js';

export async function createQuestion(quizId, question) {
    const body = addOwner(question);
    body.quiz = createPointer('Quiz', quizId);
    return await api.post('/classes/Question', body);
}

export async function getQuistionByQuizId(quizId, ownerId) {
    const query = JSON.stringify({
        quiz: createPointer('Quiz', quizId),
        owner: createPointer('_User', ownerId)
    });
    const response = await api.get('/classes/Question?where=' + encodeURIComponent(query));
    return response.results;
}

export async function updateQuestion(id, question) {
    return await api.put('/classes/Question/' + id, question);
}

export async function deleteQuestion(id) {
    return await api.del('/classes/Question/' + id);
}