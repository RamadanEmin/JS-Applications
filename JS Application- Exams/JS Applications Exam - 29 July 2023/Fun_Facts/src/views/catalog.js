import { html } from '../../node_modules/lit-html/lit-html.js';
import * as funService from '../api/funService.js';

const catalogTemplate = (facts) => html`
<h2>Fun Facts</h2>
<section id="dashboard">
    ${facts.length > 0
        ? facts.map(previewTemplate)
        : html`<h2>No Fun Facts yet.</h2>`}
</section>
`;

const previewTemplate = (fact) => html`
<div class="fact">
    <img src=${fact.imageUrl} alt="example1" />
    <h3 class="category">${fact.category}</h3>
    <p class="description">${fact.description}</p>
    <a class="details-btn" href="/details/${fact._id}">More Info</a>
</div>
`;

export async function catalogPage(ctx) {
    const facts = await funService.getAllFacts();
    ctx.render(catalogTemplate(facts));
}