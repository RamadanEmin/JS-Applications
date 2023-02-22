import { authOperations } from "../utils/authentication.js";

export  const userDataMiddleware = (ctx, next) => {
 let user = authOperations.getUser()
 user ? ctx.userData = user : ctx.userData = null
 next()
}