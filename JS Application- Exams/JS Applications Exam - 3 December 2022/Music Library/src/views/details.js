import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as musicLibraryServices from '../api/musicLibrary.js';

const detailsTemplate = (album, likes, hasLike, user, isOwner, onDelete, onLike) => html`
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
        <div id="likes">Likes: <span id="likes-count">${likes}</span></div>

        ${user && !hasLike
            ? html `<div id="action-buttons">
                 ${isOwner
                    ? html `<a href="/edit/${album._id}" id="edit-btn">Edit</a>
                            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
                    : html `<a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>`}    
                    </div>`                          
            : nothing 
        }
            
    </div>
</section>`;

export async function detailsPage(ctx) {
    const albumId = ctx.params.id;
   
    const request = [
        musicLibraryServices.getAlbum(albumId),
        musicLibraryServices.getAllLikes(albumId)
    ];

    if(ctx.user){
        request.push(musicLibraryServices.getLikeById(albumId, ctx.user._id));
    }

    const [album, likes, hasLike] = await Promise.all(request);

    const isOwner = ctx.user && ctx.user._id === album._ownerId;

    ctx.render(detailsTemplate(album, likes, hasLike, ctx.user, isOwner, onDelete, onLike));

    async function onDelete(){
        const choice = confirm('Are you sure you want to delete this album?');
        if(choice){
            await musicLibraryServices.deleteAlbum(albumId);

            ctx.page.redirect('/catalog');
        } 
    }

    async function onLike(){
        await musicLibraryServices.addLike({albumId});

        ctx.page.redirect('/details/' + albumId);
    }
}