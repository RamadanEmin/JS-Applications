import { homePage } from "./home.js";
import { showView, updateNav } from "./util.js";

const section = document.querySelector('#form-sign-up');
const form = section.querySelector('form');

form.addEventListener('submit', onSubmit);

export function registerPage() {
    showView(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const repeatPassword = formData.get('repeatPassword').trim();

    await register(email, password, repeatPassword);
    form.reset();
    updateNav();
    homePage();
}

async function register(email, password, repeatPassword) {
    try {
        if (!email || !password || !repeatPassword) {
            throw new Error('All fields are required!');
        }
        if (password !== repeatPassword) {
            throw new Error("Passwords don't match!");
        }
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters!');
        }
        const res = await fetch('http://localhost:3030/users/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }

        const user = await res.json();
        localStorage.setItem('user', JSON.stringify(user));

    } catch (err) {
        alert(err.message);
        throw err;
    }
}