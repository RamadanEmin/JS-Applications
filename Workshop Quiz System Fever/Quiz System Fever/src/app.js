import { page, render } from './library.js';
import { loginPage, registerPage } from './pages/author.js';
import { logoutPage } from './pages/logout.js';
import { navPage } from './pages/nav.js';
import { getUserData } from './util.js';
import { homePage } from './pages/home.js';

const root = document.getElementById('content');
const nav = document.getElementById('titlebar');

page(decorateContext);
page(navContext);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', logoutPage);
page('/', homePage);

page.start();

export function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.user = getUserData();
    next();
}

function navContext(ctx, next) {
    render(navPage(ctx), nav);
    next();
}