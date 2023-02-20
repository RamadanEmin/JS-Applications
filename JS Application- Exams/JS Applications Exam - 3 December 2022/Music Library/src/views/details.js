import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as musicLibraryServices from '../api/musicLibrary.js';

const detailsTemplate = (album, user, isOwner) => html`
<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Album Details</p>
        <div id="img-wrapper">
            <img src=${album.imageUrl} alt="example1" />
        </div>
        <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
            <p>
                <strong>Album name:</strong><span id="details-album">${album.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
        </div>
        <div id="likes">Likes: <span id="likes-count">0</span></div>

        ${user 
            ? html `<div id="action-buttons">
                 ${isOwner
                    ? html `<a href="/edit/${album._id}" id="edit-btn">Edit</a>
                            <a href="javascript:void(0)" id="delete-btn">Delete</a>`
                    : html `<a href="javascript:void(0)" id="like-btn">Like</a>`}    
                    </div>`                          
            : nothing 
        }
            
    </div>
</section>`;

export async function detailsPage(ctx) {
    const albumId = ctx.params.id;
    const album = await musicLibraryServices.getAlbum(albumId);
 
    const isOwner = ctx.user && ctx.user._id === album._ownerId;

    ctx.render(detailsTemplate(album, ctx.user, isOwner));

}