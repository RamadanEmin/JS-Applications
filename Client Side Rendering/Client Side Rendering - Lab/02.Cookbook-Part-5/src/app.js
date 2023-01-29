import { createNav } from './navigation.js';

import { setupHome } from './views/home.js';

window.addEventListener('load', async () => {
    const main = document.querySelector('main');
    const navbar = document.querySelector('nav');
    const navigation = createNav(main, navbar);

    navigation.registerView('home', setupHome);

    navigation.setUserNav();

    // Start application in catalog view
    navigation.goTo('home');

});