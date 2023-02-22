import { registerTemplate } from "../templates/registerTemplate.js";

export const registerView = (ctx) => {
    ctx.renderTemplate(registerTemplate());
    const formEl = document.querySelector(`form`).addEventListener(`submit`, function (e) {
        ctx.register(e, ctx)
    });
}

