import { html, nothing } from '../../../node_modules/lit-html/lit-html.js';

export const albumPreview = (album, user) => html`
<div class="card-box">
    <img src=${album.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: $${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        ${user
            ? html `<div class="btn-group">
                        <a href="/details/${album._id}" id="details">Details</a>
                    </div>`
            : nothing}
    </div>
</div>`;