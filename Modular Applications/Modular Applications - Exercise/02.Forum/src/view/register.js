import { register } from "../api/data.js";
import { input } from "../common/input.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const registerTemplate = (onSubmit, errorMsg, errors, values) => html`
<div class="narrow drop center">
    <header>
        <h1>Register</h1>
    </header>
    <form @submit=${onSubmit}>
        ${errorMsg ? html`<p class="error-msg">${errorMsg}</p>` : null}
        ${input('Email', 'text', 'email', values.email, errors.email)}
        ${input('Display Name', 'text', 'username', values.username, errors.username)}
        ${input('Password', 'password', 'password', values.password, errors.password)}
        ${input('Repeat', 'password', 'repass', values.repass, errors.repass)}
        <input class="action" type="submit" value="Sign Up">
    </form>
</div>`;

export function registerPage(ctx) {
    update();

    function update(errorMsg, errors = {}, values = {}) {
        ctx.render(registerTemplate(createSubmitHandler(onSubmit, 'email', 'username', 'password', 'repass'), errorMsg, errors, values));

    }

    async function onSubmit(data, event) {
        try {
            const missing = Object.entries(data).filter(([k, v]) => v == '');
            if (missing.length > 0) {
                const errors = missing.reduce((a, [k, v]) => Object.assign(a, { [k]: true }), {});
                throw {
                    error: new Error('All field are required!'),
                    errors
                }
            }
            if (data.password != data.repass) {
                throw {
                    error: new Error('Password don\'t match!'),
                    errors: {
                        password: true,
                        repass: true
                    }
                }
            }

            await register(data.email, data.username, data.password);
            event.target.reset();
            ctx.updateUserNav();
            ctx.page.redirect('/topics');

        } catch (err) {
            const message = err.message || err.error.message;
            update(message, err.errors, data);
        }
    }
}