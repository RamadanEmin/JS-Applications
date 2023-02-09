import { render } from "../lib.js";

const root = document.getElementById('site-content');

export default function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);

    next();
}