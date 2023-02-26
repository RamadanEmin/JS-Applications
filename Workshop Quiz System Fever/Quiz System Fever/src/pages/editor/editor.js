import { getQuistionByQuizId } from '../../api/questions.js';
import { createQuiz, getQuizById, updateQuiz } from '../../api/quiz.js';
import { html, render, topics } from '../../library.js';
import { getUserData } from '../../util.js';
import { createList } from './list.js';

const template = (quiz, quizEditor, updateCount) => html`
<section id="editor">
    <header class="pad-large">
        <h1>${quiz ? 'Edit Quiz' : 'New quiz'}</h1>
    </header>

    ${quizEditor}

    <div class="pad-large alt-page"></div>

    ${quiz ? createList(quiz.objectId, quiz.questions, updateCount) : ''}

</section>`;

const quizEditorTemplate = (quiz, onSave, working) => html`
<form @submit=${onSave}>
    <label class="editor-label layout">
        <span class="label-col">Title:</span>
        <input class="input i-med" type="text" name="title" .value=${quiz ? quiz.title : ''} ?disabled=${working}>
    </label>
    <label class="editor-label layout">
        <span class="label-col">Topic:</span>
        <select class="input i-med" name="topic" .value=${quiz ? quiz.topic : '0'} ?disabled=${working}>
            <option value="0"><span class="quiz-meta">-- Select category</span></option>

            ${Object.entries(topics).map(([k,v]) => html`<option value=${k}>${v}</option>`)}

        </select>
    </label>
    <label class="editor-label layout">
        <span class="label-col">Description:</span>
        <textarea class="input" name="description" .value=${quiz ? quiz.description : ''} ?disabled=${working}></textarea>
    </label>
    <input class="input submit action" type="submit" value="Save">
</form>

${working ? html`<div class="loading-overlay working"></div>` : ''}`;

function createQuizEditor(quiz, onSave) {
    const editor = document.createElement('div');
    editor.className = 'pad-large alt-page';
    update();

    return {
        editor,
        updateEditor: update
    };

    function update(working) {
        render(quizEditorTemplate(quiz, onSave, working), editor);
    }
}

export async function editorPage(ctx) {
    const quizId = ctx.params.id;
    let quiz = null;
    let questions = [];
    const userId = getUserData().id;
  
    if (quizId) {
        [quiz, questions] = await Promise.all([
            getQuizById(quizId),
            getQuistionByQuizId(quizId, userId)
        ]);   
        quiz.questions = questions;
    }

    const {editor, updateEditor} = createQuizEditor(quiz, onSave);

    ctx.render(template(quiz, editor, updateCount));

    async function updateCount(change = 0) {
        const count = questions.length + change;
        await updateQuiz(quizId, { questionCount: count });
    }

    async function onSave(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const title = formData.get('title');
        const topic = formData.get('topic');
        const description = formData.get('description');

        const data = {
            title,
            topic,
            description,
            questionCount: questions.length
        };

        try {
            updateEditor(true);

            if (quizId) {
                await updateQuiz(quizId, data);
            } else {
                const result = await createQuiz(data);
                ctx.page.redirect('/edit/' + result.objectId);
            }
        } catch (err) {
            console.error(err);
        } finally {
            updateEditor(false);
        }
    }
}