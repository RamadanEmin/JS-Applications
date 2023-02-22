import { userOperations } from "../services/user-services.js"

export const logout = async (ctx) => {
    let confirmLogout = confirm(`Are you sure you want to exit your profile?`)
  if(confirmLogout){
   await userOperations.logoutUser()
   ctx.showNotification(`Goodbye, ${ctx.userData.username}!`, `infoBox`)
   ctx.page.redirect('/')
  }
 }