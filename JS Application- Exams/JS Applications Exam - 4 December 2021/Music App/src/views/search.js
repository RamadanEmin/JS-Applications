import { html } from '../../node_modules/lit-html/lit-html.js';
import * as albumsServices from '../api/data.js';
import { albumPreview } from './templates/albumTemplate.js';

const searchTemplate = (albums, user, params = '', onSearch) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="" .value=${params}>
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="search-result">
        ${albums.length > 0
            ? albums.map(x => albumPreview(x, Boolean(user)))
            : html `<p class="no-result">No result.</p>`}
    </div>
</section>`;

export async function searchPage(ctx) {
    const params = ctx.querystring.split('=')[1];
    let albums = [];

    if (params) {
        albums = await albumsServices.searchAlbums(decodeURIComponent(params));
    }

    ctx.render(searchTemplate(albums, ctx.user, params, onSearch));

    async function onSearch(event) {
        event.preventDefault();

        let searchElement = document.getElementById('search-input');

        const search = await albumsServices.searchAlbums(searchElement.value);
        if (search) {
            ctx.page.redirect('/search?query=' + encodeURIComponent(searchElement.value));
        }
    }
}