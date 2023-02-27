import { deleteQuiz, getQuizByOwner } from '../api/quiz.js';
import { findUser } from '../api/user.js';
import { html, until } from '../library.js';
import { cube, line } from './common/loader.js';

const profileTemplate = (user, quiz, onDelete) => html`
<section id="profile">
    <header class="pad-large">
        <h1>Profile Page</h1>
    </header>

    <div class="hero pad-large">
        <article class="glass pad-large profile">
            <h2>Profile Details</h2>
            <p>
                <span class="profile-info">Username:</span>
                ${user.username}
            </p>
            <p>
                <span class="profile-info">Email:</span>
                ${user.email}
            </p>
            <!-- <h2>Your Quiz Results</h2>
            <table class="quiz-results">
                <tbody>
                    <tr class="results-row">
                        <td class="cell-1">23. March 2021</td>
                        <td class="cell-2"><a href="#">RISC Architecture</a></td>
                        <td class="cell-3 s-correct">85%</td>
                        <td class="cell-4 s-correct">12/15 correct answers</td>
                    </tr>
                </tbody>
            </table> -->
        </article>
    </div>

    <div class="pad-large alt-page">
        <h2>Quizes created by you:</h2>
        
        ${quiz.length == 0 
            ? html`<p>NO QUIZES</p>
                    <a class="action cta" href="/create">Create Your First Quiz</a>`
            : until(quiz.map(q => quizTemplate(q, onDelete)), cube())}
    </div>
</section>`;


const quizTemplate = (quiz, onDelete) => html`
<article class="preview layout">
    <div class="right-col">
        <a class="action cta" href="/details/${quiz.objectId}">View Quiz</a>
        <a class="action cta" href="/edit/${quiz.objectId}"><i class="fas fa-edit"></i></a>
        <button data-id=${quiz.objectId} @click=${onDelete} class="action cta" href="javascript:void(0)"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="left-col">
        <h3><a class="quiz-title-link" href="/details/${quiz.objectId}">${quiz.title}</a></h3>
        <span class="quiz-topic">Topic: ${quiz.topic}</span>
        <div class="quiz-meta">
            <span>${quiz.questionCount} question${quiz.questionCount == 1 ? '' : 's'}</span>
            <span>|</span>
            <span>Taken ${quiz.taken ? quiz.taken : '0'} time${quiz.taken == 1 ? '' : 's'}</span>
        </div>
    </div>
</article>`;


export async function profilePage(ctx) {
    const user = await findUser();
    const userQuizes = await getQuizByOwner(user.objectId);

    async function onDelete(e) {
        e.preventDefault();
        let target = e.target;
        while (target && target.tagName != 'BUTTON') {
            target = target.parentNode;
        }
        const quizId = target.dataset.id;
        if (quizId != undefined) {
            const confirmed = confirm('Are you sure you want to delete this quiz?');
            if (confirmed) {
                await deleteQuiz(quizId);
                ctx.page.redirect('/profile');
            }
        }
    }

    ctx.render(profileTemplate(user, userQuizes, onDelete));
}