import page from "../node_modules/page/page.mjs";
import { preloadCatalogData } from "./middlewares/pagePreloads/catalogPreload.js";
import { preloadCreateData } from "./middlewares/pagePreloads/createPreload.js";
import { preloadDetailsData } from "./middlewares/pagePreloads/detailsPreload.js";
import { preloadHomeData } from "./middlewares/pagePreloads/homePreload.js";
import { preloadLoginData } from "./middlewares/pagePreloads/loginPreload.js";
import { navMiddleware } from "./middlewares/navMiddleware.js";
import { notificatMiddleware } from "./middlewares/notificationsMiddleware.js";
import { preloadRegisterData } from "./middlewares/pagePreloads/registerPreload.js";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { userDataMiddleware } from "./middlewares/userData.js";
import { catalogView } from "./pages/catalogPage.js";
import { createView } from "./pages/createPage.js";
import { detailsView } from "./pages/detailsPage.js";
import { homeView } from "./pages/homePage.js";
import { loginView } from "./pages/loginPage.js";
import { registerView } from "./pages/registerPage.js";
import { loaderMiddleware } from "./middlewares/loader.js";
import { preloadMyRecipesData } from "./middlewares/pagePreloads/myRecipesPreload.js";
import { myRecipesView } from "./pages/myRecipesPage.js";
import { profileView } from "./pages/profilePage.js";
import { preloadFavRecipesData } from "./middlewares/pagePreloads/favRecipesPreload.js";
import { favRecipesView } from "./pages/favRecipesPage.js";
import { profilePicView } from "./pages/addProfilePicPage.js";
import { preloadProfileData } from "./middlewares/pagePreloads/profilePreload.js";
import { changeProfilePicView } from "./pages/changeProfilePicPage.js";
import { logout } from "./handlers/logoutHandler.js";

page(loaderMiddleware);
page(notificatMiddleware);
page(renderMiddleware);
page(navMiddleware);
page(userDataMiddleware);
page('/', preloadHomeData, homeView);
page('/profile', preloadProfileData, profileView);
page('/catalog', preloadCatalogData, catalogView);
page('/login', preloadLoginData, loginView);
page('/register', preloadRegisterData, registerView);
page('/logout', logout);
page('/create', preloadCreateData, createView);
page('/profile/my-recipes', preloadMyRecipesData, myRecipesView);
page('/profile/fav-recipes', preloadFavRecipesData, favRecipesView);
page('/profile/add-avatar', profilePicView);
page('/profile/change-avatar', changeProfilePicView);
page('/details/:recipeId', preloadDetailsData, detailsView);

page.start();