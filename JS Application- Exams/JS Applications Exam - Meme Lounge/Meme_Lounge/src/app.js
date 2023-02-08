import { page, render } from './lib.js';

import { homePage } from './views/home.js';

const root = document.querySelector('main');

page(decorateContext);
page('/', homePage);

page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav=updateUserNav;

    next();
}