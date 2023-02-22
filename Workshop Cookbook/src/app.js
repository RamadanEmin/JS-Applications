import page from "../node_modules/page/page.mjs";
import { preloadHomeData } from "./middlewares/pagePreloads/homePreload.js";
import { preloadLoginData } from "./middlewares/pagePreloads/loginPreload.js";
import { navMiddleware } from "./middlewares/navMiddleware.js";
import { preloadRegisterData } from "./middlewares/pagePreloads/registerPreload.js";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { userDataMiddleware } from "./middlewares/userData.js";
import { homeView } from "./pages/homePage.js";
import { loginView } from "./pages/loginPage.js";
import { registerView } from "./pages/registerPage.js";
import { loaderMiddleware } from "./middlewares/loader.js";
import { logout } from "./handlers/logoutHandler.js";

page(loaderMiddleware);
page(renderMiddleware);
page(navMiddleware);
page(userDataMiddleware);
page('/', preloadHomeData, homeView)
page('/login', preloadLoginData, loginView)
page('/register', preloadRegisterData, registerView)
page('/logout', logout)

page.start()