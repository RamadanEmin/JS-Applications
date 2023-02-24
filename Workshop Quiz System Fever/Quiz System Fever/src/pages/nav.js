import { html } from '../library.js';

const navTemplate = (user) => html`
<nav>
    <a class="logotype" href="/"><i class="fas fa-question-circle"></i><i
            class="merge fas fa-check-circle"></i><span>Quiz Fever</span></a>
    <div class="navigation">
        <a class="nav-link" href="/browse">Browse</a>
        ${user 
            ? html`<div id="user-nav">
                        <a class="nav-link" href="/create">Create</a>
                        <a class="nav-link profile-link" href="/profile"><i class="fas fa-user-circle"></i></a>
                        <a id="logoutBtn" class="nav-link" href="/logout">Logout</a>
                    </div>`
            : html`<div id="guest-nav">
                        <a class="nav-link" href="/login">Sign in</a>
                    </div>`}
    </div>
</nav>`;

export function navPage(ctx) {
    return navTemplate(ctx.user);
}