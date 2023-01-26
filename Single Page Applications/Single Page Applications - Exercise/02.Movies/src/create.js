import { homePage } from "./home.js";
import { showView } from "./util.js";

const section = document.querySelector('#add-movie');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

export function createPage() {
    showView(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const title = formData.get('title').trim();
    const description = formData.get('description').trim();
    const img = formData.get('imageUrl').trim();


    await createMovie(title, description, img);
    
    form.reset();
    homePage();
}

async function createMovie(title, description, img) {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!title || !description || !img) {
            throw new Error('All fields are required!');
        }
        const res = await fetch('http://localhost:3030/data/movies', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization':user.accessToken
            },
            body: JSON.stringify({ title, description, img })
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }

    } catch (err) {
        alert(err.message);
        throw err;
    }
}