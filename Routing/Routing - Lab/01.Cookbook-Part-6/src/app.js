import page from '//unpkg.com/page/page.mjs';

import { setupHome } from './views/home.js';
import { setupCatalog } from './views/catalog.js';

window.addEventListener('load', async () => {
    const main = document.querySelector('main');
    const navbar = document.querySelector('nav');
    const navigation = createNav(main, navbar);

    const views = {
        homeView: navigation.registerView('home', setupHome),
        catalogView: navigation.registerView('catalog', setupCatalog, 'catalogLink'),
    };

    page('/', views.homeView);
    page('/index.html', views.homeView);
    page('/catalog', views.catalogView);

    // Start application
    page();
});
