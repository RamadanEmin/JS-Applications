export function toggle(e){
    if(e.target.tagName == `A`){
        let pagers = Array.from(e.currentTarget.querySelector(`#pagers-container`).children)
        pagers.forEach(pager => pager.classList.remove(`active`) )
        e.target.classList.add(`active`)
    }
}