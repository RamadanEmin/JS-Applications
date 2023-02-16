import { html } from '../../node_modules/lit-html/lit-html.js';
import * as orphanageServices from '../api/orphanage.js';

const myPostsTemplate = (materials) => html`
<section id="my-posts-page">
    <h1 class="title">My Posts</h1>
    ${materials.length > 0
        ? html `<div class="my-posts">
                    ${materials.map(previewMaterial)}
                </div>`
        : html`<h1 class="title no-posts-title">You have no posts yet!</h1>`}
    
</section>`;

const previewMaterial = (material) => html`
<div class="post">
    <h2 class="post-title">${material.title}</h2>
    <img class="post-image" src=${material.imageUrl} alt="Material Image">
    <div class="btn-wrapper">
        <a href="/details/${material._id}" class="details-btn btn">Details</a>
    </div>
</div>`;

export async function myPostsPage(ctx) {
    const userId = ctx.user._id;
    const materials = await orphanageServices.getMyPosts(userId);

    ctx.render(myPostsTemplate(materials));
}