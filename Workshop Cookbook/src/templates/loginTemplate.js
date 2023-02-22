import { html } from "../../node_modules/lit-html/lit-html.js";

export const loginTemplate = () => html`
<section id="login">
    <article>
        <h2>Login</h2>
        <form id="loginForm">
            <label>Username: <input type="text" name="username"></label>
            <label>E-mail: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <input type="submit" value="Login">
        </form>
    </article>
</section>`;
