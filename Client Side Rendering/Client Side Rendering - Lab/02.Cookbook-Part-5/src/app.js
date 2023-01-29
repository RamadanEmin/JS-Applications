import { createNav } from './navigation.js';
import { logout as apiLogout } from './api/data.js';

import { setupHome } from './views/home.js';
import { setupLogin } from './views/login.js';
import { setupRegister } from './views/register.js';

window.addEventListener('load', async () => {
    const main = document.querySelector('main');
    const navbar = document.querySelector('nav');
    const navigation = createNav(main, navbar);

    navigation.registerView('home', setupHome);
    navigation.registerView('login', setupLogin, 'loginLink');
    navigation.registerView('register', setupRegister, 'registerLink');

    navigation.setUserNav();
    document.getElementById('logoutBtn').addEventListener('click', logout);

    // Start application in catalog view
    navigation.goTo('home');

    async function logout() {
        try {
            await apiLogout();
            navigation.setUserNav();
            navigation.goTo('catalog');
        } catch (err) {
            alert(err.message);
        }
    }
});