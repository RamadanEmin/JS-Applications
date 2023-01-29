import { render } from './dom.js';

export function createNav(main, navbar) {
    const views = {};
    const links = {};

    setupNavigation();
    setupForms();

    const navigator = {
        registerView,
        goTo,
    };

    return navigator;

    function setupNavigation() {
        navbar.addEventListener('click', (ev) => {
            if (ev.target.tagName == 'A') {
                const handlerName = links[ev.target.id];
                if (handlerName) {
                    ev.preventDefault();
                    goTo(handlerName);
                }
            }
        });
    }

    async function goTo(name, ...params) {
        const result = await views[name](...params);
        render(result, main);
    }

    function registerView(name, setup, navId) {
        const execute = setup(navigator);

        views[name] = (...params) => {
            [...navbar.querySelectorAll('a')].forEach(a => a.classList.remove('active'));
            if (navId) {
                navbar.querySelector('#' + navId).classList.add('active');
            }
            return execute(...params);
        };
        if (navId) {
            links[navId] = name;
        }
    }
}