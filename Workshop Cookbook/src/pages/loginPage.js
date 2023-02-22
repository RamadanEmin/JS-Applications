import { loginTemplate } from "../templates/loginTemplate.js";

export const loginView = (ctx) => {
  ctx.renderTemplate(loginTemplate())
  const formEl = document.querySelector(`form`).addEventListener(`submit`, function(e){ctx.login(e, ctx)})
}

