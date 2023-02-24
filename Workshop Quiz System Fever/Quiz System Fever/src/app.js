import { page, render } from './library.js';
import { getUserData } from './util.js';
import { homePage } from './pages/home.js';

const root = document.getElementById('content');

page(decorateContext);
page('/', homePage);

page.start();

export function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.user = getUserData();
    next();
}