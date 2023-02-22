import page from "../node_modules/page/page.mjs";
import { preloadHomeData } from "./middlewares/pagePreloads/homePreload.js";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { userDataMiddleware } from "./middlewares/userData.js";
import { homeView } from "./pages/homePage.js";
import { loaderMiddleware } from "./middlewares/loader.js";


page(loaderMiddleware);
page(renderMiddleware);
page(userDataMiddleware);
page('/', preloadHomeData, homeView);

page.start();