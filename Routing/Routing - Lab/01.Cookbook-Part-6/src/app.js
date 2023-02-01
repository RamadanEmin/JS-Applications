import page from '//unpkg.com/page/page.mjs';

import { setupHome } from './views/home.js';

window.addEventListener('load', async () => {
    const main = document.querySelector('main');
    const navbar = document.querySelector('nav');
    const navigation = createNav(main, navbar);

    const views = {
        homeView: navigation.registerView('home', setupHome),
    };

    page('/', views.homeView);
    page('/index.html', views.homeView);

    // Start application
    page();
});
