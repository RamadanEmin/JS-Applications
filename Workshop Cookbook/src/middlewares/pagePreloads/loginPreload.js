import { userOperations } from "../../services/user-services.js";
import { validateInputs } from "../../utils/Validate-Input-Fields.js";

export const preloadLoginData = (ctx, next) => {
    ctx.login = login;
    next();
}

async function login(e, ctx) {
    e.preventDefault();
    let { username, email, password } = Object.fromEntries(new FormData(e.currentTarget));
    let isInfoCorrect = validateInputs([username, email, password]);
    if (isInfoCorrect) {
        await userOperations.loginUser({ username, email, password });
        ctx.showNotification(`Welcome back, ${username}!`, `loadingBox`);
        e.target.reset();
        ctx.page.redirect('/');
    }
    else {
        ctx.showNotification(`Please enter valid email and password !`, `errorBox`);
        return;
    }
}