import { logout } from "./api/data.js";
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import { homePage } from "./view/home.js";
import { loginPage } from "./view/login.js";
import { registerPage } from "./view/register.js";

const root = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decoreteContext);

page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);

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