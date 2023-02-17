import { html } from '../../node_modules/lit-html/lit-html.js';
import * as jobsServices from '../api/jobs.js';
import { createSubmitHandler } from '../util.js';

const editTemplate = (offer, onSubmit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Offer</h2>
        <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="title" id="job-title" placeholder="Title" .value=${offer.title} />
            <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" .value=${offer.imageUrl} />
            <input type="text" name="category" id="job-category" placeholder="Category" .value=${offer.category} />
            <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50"
                .value=${offer.description}></textarea>
            <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4" cols="50"
                .value=${offer.requirements}></textarea>
            <input type="text" name="salary" id="job-salary" placeholder="Salary" .value=${offer.salary} />

            <button type="submit">post</button>
        </form>
    </div>
</section>`;


export async function editPage(ctx) {
    const offerId = ctx.params.id;
    const offer = await jobsServices.getOfferById(offerId);

    ctx.render(editTemplate(offer, createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
    const offerId = ctx.params.id;

    if (Object.values(data).some(v => v == '')) {
        return alert('All fields are required!');
    }

    await jobsServices.updateOffer(offerId, {
        title: data.title,
        imageUrl: data.imageUrl,
        category: data.category,
        description: data.description,
        requirements: data.requirements,
        salary: data.salary
    });

    event.target.reset();
    ctx.page.redirect('/details/' + offerId);
}