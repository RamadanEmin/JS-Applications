function attachEvents() {
    document.getElementById('refresh').addEventListener('click', loadMessages);
    document.getElementById('submit').addEventListener('click', onSubmit);

    loadMessages()
}

attachEvents();

const authorInput = document.querySelector('[name="author"]');
const contentInput = document.querySelector('[name="content"]');
const list = document.getElementById('messages');

async function onSubmit() {
    const author = authorInput.value.trim();
    const content = contentInput.value.trim();
    if (!author || !content) {
        return;
    }
    const result = await createMessage({ author, content });

    contentInput.value = '';
    list.value += '\n' + `${author}: ${content}`;
}

async function loadMessages() {
    const url = 'http://localhost:3030/jsonstore/messenger';
    try {
        const res = await fetch(url);
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }
        const data = await res.json();

        const messages = Object.values(data);

        list.value = messages.map(m => `${m.author}: ${m.content}`).join('\n');
    } catch (error) {
        alert(error.message);
    }
}

async function createMessage(message) {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const options = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
    };

    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }
        const result = await res.json();

        return result;
    } catch (error) {
        alert(error.message);
    }
}