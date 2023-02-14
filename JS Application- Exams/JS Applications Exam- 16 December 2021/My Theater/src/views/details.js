import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as theaterServices from '../api/theaters.js';

const detailsTemplate = (theater, isOwner, hasUser) => html`
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
            
            ${hasUser
                ? html`
                    <div class="buttons">
                        ${isOwner 
                            ? html`
                            <a class="btn-delete" href="javascript:void(0)">Delete</a>
                            <a class="btn-edit" href=${'/edit/' + theater._id}>Edit</a>`
                            : html`<a class="btn-like" href="#">Like</a>`}
                    </div>`
                 : nothing}
                   
            <p class="likes">Likes: 0</p>
        </div>
    </div>
</section>`;


export async function detailsPage(ctx) {
    const theaterId = ctx.params.id;

      const theater = await theaterServices.getTheaterById(theaterId);
    
      const isOwner = ctx.user._id === theater._ownerId;

    ctx.render(detailsTemplate(theater, isOwner, ctx.user));

}