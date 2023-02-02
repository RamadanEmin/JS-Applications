import { page, render } from './lib.js';
import { getUserData, removeUserData } from './util.js';

import { catalogView } from './views/catalog.js';

const root = document.querySelector('div.container');

page(decorateContext);
page('/', catalogView);

page.start();

function decorateContext(ctx, next) {
  ctx.render = (content) => render(content, root);
  ctx.updateUserNav = updateUserNav;
  next();
}