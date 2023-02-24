import { editTemplate } from "../templates/editTemplate.js";

export const editView = (ctx) => {
    ctx.renderTemplate(editTemplate(ctx.recipe));
    const formEl = document.querySelector(`form`).addEventListener(`submit`, function (e) { ctx.edit(e, ctx) });
}