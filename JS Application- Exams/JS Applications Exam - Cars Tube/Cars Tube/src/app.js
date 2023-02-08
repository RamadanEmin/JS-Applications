import page from '../node_modules/page/page.mjs';

import { addRender } from './middlewares/render.js';
import { addSession } from './middlewares/session.js';

import { homePage } from './views/home.js';
import { catalogPage } from './views/listings.js';
import { myListingsPage } from './views/myListings.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout } from './api/users.js';

page(addSession);
page(addRender);


page('/', homePage);
page('/listings', catalogPage);
page('/myListings', myListingsPage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', onLogout);

page.start();

function onLogout(ctx) {
    logout();
    ctx.page.redirect('/');
}