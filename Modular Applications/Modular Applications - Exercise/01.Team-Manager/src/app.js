import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';

import { homePage } from './views/home.js';

const main = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', logout);

page('/', decorateContext, homePage);

page.start();

function decorateContext(ctx, next) {
    ctx.setUserNav = setUserNav;
    ctx.render = (content) => render(content, main);

    next();
}