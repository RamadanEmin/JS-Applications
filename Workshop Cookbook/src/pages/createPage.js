import { createTemplate } from "../templates/createTemplate.js";

export function createView(ctx) {
    ctx.renderTemplate(createTemplate());
    const formEl = document.querySelector(`form`).addEventListener(`submit`, function (e) {
        ctx.create(e, ctx);
    });
}

