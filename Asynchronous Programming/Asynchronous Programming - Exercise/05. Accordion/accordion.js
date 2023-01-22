async function solution() {
    const main = document.getElementById('main');

    try {
        const response = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        const data = await response.json();

        data.forEach(article => {
            const accordion = genElement('div', main, null, 'accordion');
            const head = genElement('div', accordion, null, 'head');
            genElement('span', head, article.title, null);
            const button = genElement('button', head, 'More', 'button');
            button.id = article._id;
            const extra = genElement('div', accordion, null, 'extra');
            genElement('p', extra, article.content, null);
            extra.style.display = 'none';

            button.addEventListener('click', toggle);
        });
    } catch (error) {
        console.log(error.message);
    }

    async function toggle(e) {
        try {
            const button = e.currentTarget;
            const extra = button.parentNode.nextSibling;
            const p = extra.querySelector('p');

            const response = await fetch('http://localhost:3030/jsonstore/advanced/articles/details/' + button.id);
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            p.textContent = data.content;

            if (button.textContent === 'More') {
                button.textContent = 'Less';
                extra.style.display = 'block';
            } else {
                button.textContent = 'More';
                extra.style.display = 'none';
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    function genElement(tag, parent, content, className) {
        const element = document.createElement(tag);
        if (content) {
            element.textContent = content;
        }
        if (className) {
            element.className = className;
        }
        parent.appendChild(element);
        return element;
    }
}

solution()