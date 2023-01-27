import { render } from './dom.js';
import { home } from './home.js';

document.querySelector('header').addEventListener('click', setupNavigation);
document.getElementById('views').remove();

const links = {
    'homeLink': home
};

// Start application in catalog view
goTo('homeLink');

export function goTo(viewName) {
    const view = links[viewName];

    if (typeof view === 'function') {
        view({
            render,
            goTo,
            setUserNav
        });

        return true;
    } else {
        return false;
    }
}