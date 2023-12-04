import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userServices from '../api/users.js';
import { createSubmitHandler } from '../util.js';

const registerTemplate = (onSubmit) => html`
<section id="register">
    <div class="form">
    <h2>Register</h2>
    <form @submit=${onSubmit} class="register-form">
        <input
        type="text"
        name="email"
        id="register-email"
        placeholder="email"
        />
        <input
        type="password"
        name="password"
        id="register-password"
        placeholder="password"
        />
        <input
        type="password"
        name="re-password"
        id="repeat-password"
        placeholder="repeat password"
        />
        <button type="submit">register</button>
        <p class="message">Already registered? <a href="/login">Login</a></p>
    </form>
    </div>
</section>
`;

export function registerPage(ctx) {

    ctx.render(registerTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
    if (!data.email || !data.password) {
        return alert('All fields are required!');
    }
    if (data.password !== data['re-password']) {
        return alert('Password don\'t match!');
    }

    await userServices.register(data.email, data.password);

    event.target.reset();
    ctx.page.redirect('/');
}