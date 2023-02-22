const overlayEl = document.querySelector(`.overlay`)
const paragraphEl = overlayEl.querySelector(`p`)
const anchorEl1 = overlayEl.querySelector(`#link1`)
const anchorEl2 = overlayEl.querySelector(`#link2`)

const hide = () => { overlayEl.style.display = `none`}
const show = (message, btn1Text, btn2Text) => {
    overlayEl.style.display = `block`
    paragraphEl.textContent = message
    anchorEl1.textContent = btn1Text
    anchorEl2.textContent = btn2Text
    let confirm
    anchorEl1.addEventListener(`click`, (e) => {e.preventDefault();hide(); confirm = true})
    anchorEl2.addEventListener(`click`, (e) => {e.preventDefault();hide(); confirm = false})
    console.log(confirm);
    return confirm
}

export const modal = (message, btn1Text, btn2Text) => {
    show(message, btn1Text, btn2Text)
}