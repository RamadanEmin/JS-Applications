const loadingSpinner = document.getElementById(`loader`);

const show = () => {
    loadingSpinner.style.display = `block`;
}
const hide = () =>{
    loadingSpinner.style.display = `none`;
}

export const loaderMiddleware = (ctx, next) => {
    ctx.showLoader = show;
    ctx.hideLoader = hide;
    next();
}