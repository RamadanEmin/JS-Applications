import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userServices from '../api/users.js';
import { createSubmitHandler } from '../util.js';

const loginTemplate = (onSubmit) => html`
<section id="login-page" class="auth">
    <form @submit=${onSubmit} id="login">
        <h1 class="title">Login</h1>

        <article class="input-group">
            <label for="login-email">Email: </label>
            <input type="email" id="login-email" name="email">
        </article>

        <article class="input-group">
            <label for="password">Password: </label>
            <input type="password" id="password" name="password">
        </article>

        <input type="submit" class="btn submit-btn" value="Log In">
    </form>
</section>`;

export async function loginPage(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
    if (!data.email || !data.password) {
        return alert('Please fill both fields!');
    }

    await userServices.login(data.email, data.password);

    event.target.reset();
    ctx.page.redirect('/');
}