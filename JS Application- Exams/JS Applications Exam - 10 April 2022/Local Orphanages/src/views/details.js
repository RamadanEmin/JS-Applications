import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as orphanageServices from '../api/orphanage.js';

const detailsTemplate = (material, user, isOwner) => html`
<section id="details-page">
    <h1 class="title">Post Details</h1>

    <div id="container">
        <div id="details">
            <div class="image-wrapper">
                <img src=${material.imageUrl} alt="Material Image" class="post-image">
            </div>
            <div class="info">
                <h2 class="title post-title">${material.title}</h2>
                <p class="post-description">Description: ${material.description}</p>
                <p class="post-address">Address: ${material.address}</p>
                <p class="post-number">Phone number: ${material.phone}</p>
                <p class="donate-Item">Donate Materials: 0</p>

                ${user
                    ? html `
                    <div class="btns">
                        ${isOwner
                            ? html `<a href="/edit/${material._id}" class="edit-btn btn">Edit</a>
                                    <a href="javascript:void(0)" class="delete-btn btn">Delete</a>` 
                            : html `<a href="javascript:void(0)" class="donate-btn btn">Donate</a>`}
                    </div>`
                    : nothing
                }

            </div>
        </div>
    </div>
</section>`;

export async function detailsPage(ctx) {
    const postId = ctx.params.id;
    const material = await orphanageServices.getMaterialById(postId);
  
    const isOwner = ctx.user && ctx.user._id == material._ownerId;

    ctx.render(detailsTemplate(material, ctx.user, isOwner));

}