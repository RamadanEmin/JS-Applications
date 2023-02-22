import { render } from "../../node_modules/lit-html/lit-html.js"
const container = document.querySelector(`#main-content`)

export const renderMiddleware = (ctx, next) => {
  ctx.showLoader()
  ctx.renderTemplate = (template) => {
    ctx.hideLoader()
    render(template, container)}
  next()
}