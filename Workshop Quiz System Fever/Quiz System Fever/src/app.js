import { getQuistionByQuizId } from './api/questions.js';
import { getQuizById } from './api/quiz.js';
import { page, render } from './library.js';
import { loginPage, registerPage } from './pages/author.js';
import { browsePage } from './pages/browse.js';
import { logoutPage } from './pages/logout.js';
import { navPage } from './pages/nav.js';
import { quizPage } from './pages/quiz/quiz.js';
import { getUserData } from './util.js';
import { cube } from './pages/common/loader.js';
import { resultPage } from './pages/quiz/result.js';
import { homePage } from './pages/home.js';
import { detailsPage } from './pages/quiz/details.js';

const state = {};
const root = document.getElementById('content');
const nav = document.getElementById('titlebar');

page(decorateContext);
page(navContext);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', logoutPage);
page('/', homePage);
page('/browse', browsePage);
page('/details/:id', getQuiz, detailsPage);
page('/quiz/:id', getQuiz, quizPage);
page('/results/:id', getQuiz, resultPage);

page.start();

export function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.user = getUserData();
    next();
}

async function getQuiz(ctx, next) {
    ctx.clearState = clearState;
    const quizId = ctx.params.id;
    if (state[quizId] == undefined) {
        ctx.render(cube());
        state[quizId] = await getQuizById(quizId);
        const ownerId = state[quizId].owner.objectId;
        state[quizId].questions = await getQuistionByQuizId(quizId, ownerId);
        state[quizId].answers = state[quizId].questions.map(q => undefined);
    }
    ctx.quiz = state[quizId];
    next();
}

function clearState(quizId) {
    if (state[quizId]) {
        delete state[quizId];
    }
}

function navContext(ctx, next) {
    render(navPage(ctx), nav);
    next();
}