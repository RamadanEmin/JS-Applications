import { profileTemplate } from "../templates/profileTemplate.js";

export const profileView = async (ctx) => {
    ctx.renderTemplate(profileTemplate(ctx.userData));
}