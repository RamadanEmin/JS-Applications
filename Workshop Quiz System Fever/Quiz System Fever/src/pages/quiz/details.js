import { getSolutionCount } from '../../api/solutions.js';
import { html, until, topics } from '../../library.js';
import { getUserData } from '../../util.js';
import { line } from '../common/loader.js';

const detailsTemplate = (quiz, user) => html`
<section id="details">
    <div class="pad-large alt-page">
        <article class="details">
            <h1>${quiz.title}</h1>
            <span class="quiz-topic">A quiz by <strong>${quiz.owner.username}</strong></a> on the topic of <strong>${topics[quiz.topic]}</strong></span>
            ${until(loadCount(quiz), line())}
            <p class="quiz-desc">${quiz.description}</p>

            ${user && quiz.questionCount != 0
                ? html`<div>
                            <a class="cta action" href="/quiz/${quiz.objectId}">Begin Quiz</a>
                        </div>` 
                : ''}
                        
        </article>
    </div>
</section>`;


async function loadCount(quiz) {
    const taken = (await getSolutionCount([quiz.objectId]))[quiz.objectId] || 0;

    return html`
        <div class="quiz-meta">
            <span>${quiz.questionCount} Question${quiz.questionCount == 1 ? '' : 's'}</span>
            <span>|</span>
            <span>Taken ${taken} time${taken == 1 ? '' : 's'}</span>
        </div>`;
}


export async function detailsPage(ctx) {
    const user = getUserData();
    ctx.render(detailsTemplate(ctx.quiz, user));
}