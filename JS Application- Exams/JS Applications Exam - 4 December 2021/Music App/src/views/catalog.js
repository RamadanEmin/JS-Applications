import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as albumsServices from '../api/data.js';
import { albumPreview } from './templates/albumTemplate.js';

const catalogTemplate = (albums, user) => html`
<section id="catalogPage">
    <h1>All Albums</h1>
    ${albums.length > 0
    ? albums.map(x => albumPreview(x, Boolean(user)))
    : html`<p>No Albums in Catalog!</p>`}
</section>`;

export async function catalogPage(ctx) {
    const albums = await albumsServices.getAllAlbums();

    ctx.render(catalogTemplate(albums, ctx.user));
}