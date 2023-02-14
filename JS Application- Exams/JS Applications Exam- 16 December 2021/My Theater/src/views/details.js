import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as theaterServices from '../api/theaters.js';
import * as likeServices from '../api/likes.js';

const detailsTemplate = (theater, isOwner, onDelete, onLike, likes, hasLike, hasUser) => html`
<section id="detailsPage">
    <div id="detailsBox">
        <div class="detailsInfo">
            <h1>Title: ${theater.title}</h1>
            <div>
                <img src=${theater.imageUrl} />
            </div>
        </div>

        <div class="details">
            <h3>Theater Description</h3>
            <p>${theater.description}</p>
            <h4>Date: ${theater.date}</h4>
            <h4>Author: ${theater.author}</h4>
            
            ${hasUser && !hasLike
                ? html`
                    <div class="buttons">
                        ${isOwner 
                            ? html`
                            <a @click=${onDelete} class="btn-delete" href="javascript:void(0)">Delete</a>
                            <a class="btn-edit" href=${'/edit/' + theater._id}>Edit</a>`
                            : html`<a @click=${onLike} class="btn-like" href="#">Like</a>`}
                    </div>`
                 : nothing}
                   
            <p class="likes">Likes: ${likes}</p>
        </div>
    </div>
</section>`;


export async function detailsPage(ctx) {
    const theaterId = ctx.params.id;

    const request = [
        theaterServices.getTheaterById(theaterId),
        likeServices.getAllLikes(theaterId)
      ];
      
      if (ctx.user) {
        request.push(likeServices.getLike(theaterId, ctx.user._id));
      }
      const [theater, likes, hasLike] = await Promise.all(request);
    
      const isOwner = ctx.user._id === theater._ownerId;

    ctx.render(detailsTemplate(theater, isOwner, onDelete, onLike, likes, hasLike, ctx.user));

    function onDelete() {
        const choice = confirm('Are you sure you want to delete this theater?');
        if (choice) {
            theaterServices.deleteEvent(theaterId);

            ctx.page.redirect('/profile');
        }
    }

   async function onLike(){
        await likeServices.addLike(theaterId);

        ctx.page.redirect('/details/' + theaterId);
    }
}