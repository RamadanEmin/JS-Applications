import { html, render } from "../../node_modules/lit-html/lit-html.js";

const navTemplate = (user) => html`
<nav>
    <a href="/">Theater</a>
    <ul>
        ${user
            ? html `<li><a href="/profile">Profile</a></li>
                    <li><a href="/create">Create Event</a></li>
                    <li><a href="/logout">Logout</a></li>`
            : html `<li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>`}
    </ul>
</nav>`;

const header = document.querySelector('.my-header');
const root = document.getElementById('content');

function ctxRender(content) {
    render(content, root);
}

export function addRender(ctx, next) {
    render(navTemplate(ctx.user), header);
    ctx.render = ctxRender;
    next();
}