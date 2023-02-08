import { html } from '../../node_modules/lit-html/lit-html.js';
import * as usersServices from '../api/users.js'
import { createSubmitHandler } from '../util.js';

const registerTemplate = (onSubmit) => html`
<section id="register">
    <div class="container">
        <form @submit=${onSubmit} id="register-form">
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>

            <p>Username</p>
            <input type="text" placeholder="Enter Username" name="username" required>

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password" required>

            <p>Repeat Password</p>
            <input type="password" placeholder="Repeat Password" name="repeatPass" required>
            <hr>

            <input type="submit" class="registerbtn" value="Register">
        </form>
        <div class="signin">
            <p>Already have an account?
                <a href="/login">Sign in</a>.
            </p>
        </div>
    </div>
</section>`;

export function registerPage(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
    if (!data.username || !data.password) {
        return alert('Please fill both fields!');
    }
    if (data.password != data.repeatPass) {
        return alert('Password don\'t match!');
    }

    await usersServices.register(data.username, data.password);

    event.target.reset();
    ctx.page.redirect('/listings');
}