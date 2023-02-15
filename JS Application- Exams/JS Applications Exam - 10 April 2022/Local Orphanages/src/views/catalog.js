import { html } from '../../node_modules/lit-html/lit-html.js';
import * as orphanageServices from '../api/orphanage.js';

const catalogTemplate = (materials) => html`
<section id="dashboard-page">
    <h1 class="title">All Posts</h1>
    ${materials.length > 0
        ? html`<div class="all-posts">
        ${materials.map(previewMaterial)}
    </div>`
        : html`<h1 class="title no-posts-title">No posts yet!</h1>`}
</section>`;

const previewMaterial = (material) => html`
<div class="post">
    <h2 class="post-title">${material.title}</h2>
    <img class="post-image" src=${material.imageUrl} alt="Material Image">
    <div class="btn-wrapper">
        <a href="/details/${material._id}" class="details-btn btn">Details</a>
    </div>
</div>`;

export async function catalogPage(ctx) {
    const materials = await orphanageServices.getAllMaterials();

    ctx.render(catalogTemplate(materials));
}