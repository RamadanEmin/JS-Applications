import { html, render } from '../../library.js';

const radioEdit = (questIndex, index, value, checked) => html`
<div class="editor-input">
    <label class="radio">
        <input class="input" type="radio" name=${`question-${questIndex}`} .value=${index} ?checked=${checked} />
        <i class="fas fa-check-circle"></i>
    </label>

    <input class="input" type="text" name=${`answer-${index}`} .value=${value}/>
    <button data-index=${index} class="input submit action"><i class="fas fa-trash-alt"></i></button>
</div>`;

export function createAnswerList(data, questionIndex) {
    const answer = data.answers;
    const element = document.createElement('div');
    element.addEventListener('click', onDelete);
    element.addEventListener('change', onChange);

    update();
    return element;

    function update() {
        render(html` 
            ${answer.map((a, i) => radioEdit(questionIndex, i, a, data.correctIndex == i))}
            <div class="editor-input">
                <button @click=${addAnswer} class="input submit action">
                    <i class="fas fa-plus-circle"></i>
                    Add answer
                </button>
            </div>`,
            element
        );
    }

    function onChange(e) {
        if (e.target.getAttribute('type') == 'text') {
            const index = Number(e.target.name.split('-')[1]);
            answer[index] = e.target.value || '';
        } else {
            data.correctIndex = Number(e.target.value);
        }
    }

    function addAnswer(e) {
        e.preventDefault();
        answer.push('');
        update();
    }

    function onDelete(e) {
        let target = e.target;
        while (target && target != element && target.tagName != 'BUTTON') {
            target = target.parentNode;
        }
        const index = target.dataset.index;
        if (index != undefined) {
            e.preventDefault();
            answer.splice(index, 1);
            update();
        }
    }
}