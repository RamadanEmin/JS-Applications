import { html } from '../library.js';

const homeTemplate = () => html`
<section id="welcome">
    <div class="hero layout">
        <div class="splash right-col"><i class="fas fa-clipboard-list"></i></div>
        <div class="glass welcome">
            <h1>Welcome to Quiz Fever!</h1>
            <a class="action cta" href="/login">Sign in to create a quiz</a>
        </div>
    </div>

    <div class="pad-large alt-page">
        <h2>Our most recent quiz:</h2>

    </div>

</section>`;

export async function homePage(ctx) {
    ctx.render(homeTemplate());
}