import page from '../node_modules/page/page.mjs';

import { addSession } from './middlewares/session.js';
import { addRender } from './middlewares/render.js';

import { homePage } from './views/home.js';
import { catalogPage } from './views/catalog.js';
import { registerPage } from './views/register.js';
import { loginPage } from './views/login.js';
import { logout } from './api/users.js';

page(addSession);
page(addRender);

page('/', homePage);
page('/catalog', catalogPage);
page('/register', registerPage);
page('/login', loginPage);
page('/logout', onLogout);

page.start();

function onLogout(ctx) {
    logout();
    ctx.page.redirect('/');
}