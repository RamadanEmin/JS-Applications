import { page } from './lib.js';
import { homePage } from './views/home.js';
import decorateContext from './middlewares/decorateContext.js';

page(decorateContext);
page('/', homePage);

page.start();



