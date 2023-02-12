import page from '../node_modules/page/page.mjs';

import { addRender } from './middlewares/render.js';
import { addSession } from './middlewares/session.js';

import { logout } from './api/users.js';
import { homePage } from './views/home.js';
import { catalogPage } from './views/catalog.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';

page(addSession);
page(addRender);

page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', onLogout);
page('/catalog', catalogPage);

page.start();

function onLogout(ctx) {
    logout();
    ctx.page.redirect('/');
}