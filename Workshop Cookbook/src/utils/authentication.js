 function getToken(){
    let user = JSON.parse(localStorage.getItem(`user`))
    return user.accessToken
}
function getUser(){
    let userSerialized = localStorage.getItem(`user`)
   let user = JSON.parse(userSerialized)
    return user
}
function saveUser(user){
   localStorage.setItem(`user`, JSON.stringify(user))
}
function clearStorage(){
    localStorage.clear()
}
function navUpdate(user = false){
    const welcomeMsg = document.querySelector(`#welcome-message`)
    const guestLinks = document.querySelector(`#guest`)
    const userLinks = document.querySelector(`#profile`)
    
    if(user){
           userLinks.style.display = `inline-block`
           guestLinks.style.display = `none` 
          welcomeMsg.textContent = `Welcome, ${this.getUser().username}`
       }
    else{
        guestLinks.style.display = `inline-block`
        userLinks.style.display = `none`
     
    }
}
export const authOperations = {
    getToken,
    saveUser,
    getUser,
    clearStorage,
    navUpdate
}