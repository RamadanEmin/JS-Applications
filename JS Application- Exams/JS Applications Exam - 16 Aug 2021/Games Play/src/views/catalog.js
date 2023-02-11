import { html } from '../../node_modules/lit-html/lit-html.js';
import * as gameService from '../api/games.js';

const catalogTemplate = (games) => html`
<section id="catalog-page">
    <h1>All Games</h1>
    ${gameList(games)}
</section>`;

const gameList = (games) => {
    if (games.length > 0) {
        return games.map(previewTemplate);
    } else {
        return html`<h3 class="no-articles">No articles yet</h3>`;
    }
}

const previewTemplate = (game) => html`
<div class="allGames">
    <div class="allGames-info">
        <img src=${game.imageUrl}>
        <h6>${game.category}</h6>
        <h2>${game.title}</h2>
        <a href="/details/${game._id}" class="details-button">Details</a>
    </div>
</div>`;

export async function catalogPage(ctx) {
    const games = await gameService.getAll();

    ctx.render(catalogTemplate(games));
}