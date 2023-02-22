const notifications = document.querySelector(`.notification`)
const spanEl = notifications.querySelector(`span`)
const hide = () => {notifications.style.display = `none`}
const show = (message, id) => {
    notifications.removeAttribute(`id`)
    notifications.setAttribute(`id`, id)
    spanEl.textContent = message
    notifications.style.display = `block`
    const timeoutHide = setTimeout(hide, 3000)
}

export const notificatMiddleware = (ctx, next) => {
    ctx.showNotification = show
    ctx.hideNotification = hide
    next()
}