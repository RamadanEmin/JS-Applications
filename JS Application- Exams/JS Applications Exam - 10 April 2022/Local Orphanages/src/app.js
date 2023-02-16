import page from '../node_modules/page/page.mjs';

import { addRender } from './middlewares/render.js';
import { addSession } from './middlewares/session.js';

import { catalogPage } from './views/catalog.js';
import { myPostsPage } from './views/myPosts.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout } from './api/users.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';

page(addSession);
page(addRender);

page('/', catalogPage);
page('/myPosts', myPostsPage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', onLogout);
page('/create', createPage); 
page('/details/:id', detailsPage);
page('/edit/:id', editPage);

page.start();

function onLogout(ctx) {
    logout();
    ctx.page.redirect('/');
}