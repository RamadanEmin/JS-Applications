import { homePage } from "./home.js";

const routes = {
    '/': homePage,
};


document.querySelector('nav').addEventListener('click', onNavigate);
document.querySelector('#add-movie-button a').addEventListener('click', onNavigate);

function onNavigate(event) {
    if (event.target.tagName === 'A' && event.target.href) {
        event.preventDefault();
        const url = new URL(event.target.href);

        const view = routes[url.pathname];
        if (typeof view === 'function') {
            view();
        }
    }
}

homePage();