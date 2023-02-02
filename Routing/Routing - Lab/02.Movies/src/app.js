import { page, render } from "./lib.js";
import { catalogPage } from "./views/catalog.js";

const root = document.querySelector('main');

page(decorateContext);
page('/home', catalogPage);

page('/', catalogPage);
updateUserNav();
page.start();

async function decorateContext(ctx, next) {
    ctx.render = (template) => render(template, root);
    ctx.updateUserNav = updateUserNav;
    next();
}