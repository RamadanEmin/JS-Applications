import { page } from './lib.js';
import { homePage } from './views/home.js';
import decorateContext, { updateUserNav } from './middlewares/decorateContext.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);

updateUserNav();
page.start();



