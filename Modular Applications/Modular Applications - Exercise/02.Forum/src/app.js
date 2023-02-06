import { logout } from "./api/data.js";
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import { createPage } from "./view/create.js";
import { detailsPage } from "./view/details.js";
import { homePage } from "./view/home.js";
import { loginPage } from "./view/login.js";
import { registerPage } from "./view/register.js";
import { topicsPage } from "./view/topics.js";

const root = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decoreteContext);

page('/', homePage);
page('/topics', topicsPage);
page('/topic/:id', detailsPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);

updateUserNav();
page.start();

function decoreteContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;

    next();
}

function updateUserNav() {
    const userData = getUserData();
    if (userData) {
        document.querySelector('.user').style.display = 'inline-block';
        document.querySelector('.guest').style.display = 'none';
    } else {
        document.querySelector('.guest').style.display = 'inline-block';
        document.querySelector('.user').style.display = 'none';
    }
}

function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/');
}