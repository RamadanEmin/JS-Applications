import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as albumsServices from '../api/data.js';

const detailsTemplate = (album, onDelete) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src=${album.imgUrl}>
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${album.name}</h1>
                <h3>Artist: ${album.artist}</h3>
                <h4>Genre: ${album.genre}</h4>
                <h4>Price: $${album.price}</h4>
                <h4>Date: ${album.releaseDate}</h4>
                <p>${album.description}</p>

                ${album.isOwner
                ? html`<div class="actionBtn">
                    <a href="/edit/${album._id}" class="edit">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
                </div>`
                : nothing}
            </div>
        </div>
</section>`;


export async function detailsPage(ctx) {
    const albumId = ctx.params.id;
    const album = await albumsServices.getAlbumById(albumId);

    if (ctx.user) {
        album.isOwner = album._ownerId == ctx.user._id;
    }

    ctx.render(detailsTemplate(album, onDelete));

    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete album ${album.name}?`);
        if (choice) {
            await albumsServices.deleteAlbumById(albumId);
            ctx.page.redirect('/catalog');
        }
    }
}