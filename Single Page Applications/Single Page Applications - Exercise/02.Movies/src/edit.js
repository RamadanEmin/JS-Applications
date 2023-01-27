import { detailsPage } from "./details.js";
import { showView } from "./util.js";

const section = document.querySelector('#edit-movie');
const form = section.querySelector('form');
const submitBtn = section.querySelector('form button')

export function editPage(e, movie) {
    e.preventDefault();

    showView(section);
    submitBtn.addEventListener('click', (event) => onEdit(event, movie));
    form.querySelector('[name="title"]').value = movie.title;
    form.querySelector('[name="description"]').value = movie.description;
    form.querySelector('[name="imageUrl"]').value = movie.img;
    form.id = movie._id;
}

async function onEdit(event, movie) {
    event.preventDefault();

    const formData = new FormData(form);

    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageUrl');

    try {
        const response = await fetch(`http://localhost:3030/data/movies/${movie._id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': JSON.parse(localStorage.getItem('user')).accessToken
            },
            body: JSON.stringify({ title, description, img })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        form.reset();

        detailsPage(movie._id);
    } catch (error) {
        alert(error.message);
    }

}