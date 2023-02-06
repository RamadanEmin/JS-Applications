import { page, render } from "./lib.js";
import { homePage } from "./view/home.js";

const root = document.querySelector('main');

page(decoreteContext);

page('/', homePage);

updateUserNav();
page.start();

function decoreteContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;

    next();
}
