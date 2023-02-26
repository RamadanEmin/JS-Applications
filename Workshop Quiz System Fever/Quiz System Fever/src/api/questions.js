import { addOwner, createPointer } from './data.js';
import * as api from './api.js';

export async function createQuestion(quizId, question) {
    const body = addOwner(question);
    body.quiz = createPointer('Quiz', quizId);
    return await api.post('/classes/Question', body);
}

export async function deleteQuestion(id) {
    return await api.del('/classes/Question/' + id);
}