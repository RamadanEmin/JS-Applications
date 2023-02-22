import { render } from "../../node_modules/lit-html/lit-html.js";
import * as navLinksTemplates from "../templates/navTemplate.js";
import { authOperations } from "../utils/authentication.js";

const header = document.querySelector(`header`);
const navEl = header.querySelector(`nav`);

export function navMiddleware(ctx, next) {
  let user = authOperations.getUser();
  user ? render(navLinksTemplates.navUserTemplate(), navEl) : render(navLinksTemplates.navGuestTemplate(), navEl);

  const navLinks = [Array.from(navEl.children)[0], ...Array.from(navEl.children[1].children)].filter(link => link.id !== `logoutBtn`);
  navClassToggle(ctx.pathname, navLinks);

  next();
}

const navClassToggle = (pathname, navLinks) => {
  navLinks.forEach(link => {
    if (link.className == `active`) {
      link.classList.remove(`active`);
    }
  });

  if (pathname !== `/`) {
    if (pathname.startsWith(`/catalog/`)) {
      let catalogLink = navLinks.find(link => link.id == `catalogLink`);
      catalogLink.classList.add(`active`);
    }
    else if (pathname.startsWith(`/profile/`)) {
      let myRecipesLink = navLinks.find(link => link.id == `myRecipesLink`);
      myRecipesLink.classList.add(`active`);
    }
    else {
      navLinks.forEach(link => {
        let linkPathname = new URL(link.href).pathname;
        if (linkPathname === pathname) {
          link.classList.add(`active`);
        }
      });
    }
  }
}