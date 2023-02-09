import { page, render } from './lib.js';

import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout } from './api/data.js';
import { getUserData } from './util.js';

const root = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);

updateUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav=updateUserNav;

    next();
}

function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/');
}

function updateUserNav() {
    const userData = getUserData();

    if (userData) {
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
        document.querySelector('.user span').textContent = `Welcome, ${userData.email}`;
    } else {
        document.querySelector('.guest').style.display = 'block';
        document.querySelector('.user').style.display = 'none';
    }
}