import { html } from '../../node_modules/lit-html/lit-html.js';
import * as motorcycleServices from '../api/motorcycles.js';
import { createSubmitHandler } from '../util.js';

const editTemplate = (motorcycle,onSubmit) => html`
<section id="edit">
    <h2>Edit Motorcycle</h2>
    <div class="form">
        <h2>Edit Motorcycle</h2>
        <form @submit=${onSubmit} class="edit-form">
        <input
            type="text"
            name="model"
            id="model"
            placeholder="Model"
            .value=${motorcycle.model}
        />
        <input
            type="text"
            name="imageUrl"
            id="moto-image"
            placeholder="Moto Image"
            .value=${motorcycle.imageUrl}
        />
        <input
        type="number"
        name="year"
        id="year"
        placeholder="Year"
        .value=${motorcycle.year}
        />
        <input
        type="number"
        name="mileage"
        id="mileage"
        placeholder="mileage"
        .value=${motorcycle.mileage}
    />
    <input
        type="number"
        name="contact"
        id="contact"
        placeholder="contact"
        .value=${motorcycle.contact}
    />
        <textarea
        id="about"
        name="about"
        placeholder="about"
        rows="10"
        cols="50"
        .value=${motorcycle.about}
        ></textarea>
        <button type="submit">Edit Motorcycle</button>
        </form>
    </div>
</section>`;

export async function editPage(ctx) {
    const motorcycleId = ctx.params.id;
    const motorcycle = await motorcycleServices.getMotorcycle(motorcycleId);

    ctx.render(editTemplate(motorcycle, createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
    const motorcycleId = ctx.params.id;
    if (Object.values(data).some(v => v == '')) {
        return alert('All fields are required!');
    }

    await motorcycleServices.updateMotorcycle(motorcycleId, {
        model: data.model,
        imageUrl: data.imageUrl,
        year: data.year,
        mileage: data.mileage,
        contact: data.contact,
        about: data.about
    });

    event.target.reset();
    ctx.page.redirect('/details/' + motorcycleId);
}