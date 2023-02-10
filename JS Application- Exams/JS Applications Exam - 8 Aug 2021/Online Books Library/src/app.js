import { page } from './lib.js';
import { homePage } from './views/home.js';
import decorateContext, { updateUserNav } from './middlewares/decorateContext.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { myBooksPage } from './views/my-books.js';
import { searchPage } from './views/search.js';

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/my-books', myBooksPage);
page('/search', searchPage);

updateUserNav();
page.start();



