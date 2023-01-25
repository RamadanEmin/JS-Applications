import { setupCatalog } from './catalog.js';

window.addEventListener('load', async () => {
    setupCatalog();

    document.querySelector('nav a').addEventListener('click', setupCatalog);
});