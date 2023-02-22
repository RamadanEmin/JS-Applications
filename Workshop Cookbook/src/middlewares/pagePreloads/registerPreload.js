import { userOperations } from "../../services/user-services.js";
import { validateInputs } from "../../utils/Validate-Input-Fields.js";

export const preloadRegisterData = (ctx, next) => {
ctx.register = register
next()
}

async function register(e,ctx){
    e.preventDefault()
    let {username,email, password, rePass, countrySelect} = Object.fromEntries(new FormData(e.currentTarget))
    let isInfoCorrect = validateInputs([username,email, password, rePass])
    let doPasswordsMatch = Boolean(password === rePass)
    if(isInfoCorrect && doPasswordsMatch){
        console.log(countrySelect);
        await userOperations.registerUser({username,email, password, countrySelect})
        ctx.showNotification(`Welcome, ${username}! Your registration is done.`, `loadingBox`)
        ctx.page.redirect('/')
    }
    else{
        if(!isInfoCorrect){ctx.showNotification(`Please fill all fields !`, `errorBox`); return}
        else if(!doPasswordsMatch){ctx.showNotification(`Please enter matching passwords !`, `errorBox`); return}
    }
  }