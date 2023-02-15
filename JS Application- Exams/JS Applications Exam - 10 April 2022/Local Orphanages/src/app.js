import page from '../node_modules/page/page.mjs';

import { addRender } from './middlewares/render.js';
import { addSession } from './middlewares/session.js';

import { catalogPage } from './views/catalog.js';

page(addSession);
page(addRender);

page('/', catalogPage);

page.start();