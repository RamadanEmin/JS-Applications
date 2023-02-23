import { userOperations } from "../../services/user-services.js";

export const preloadProfileData = async (ctx, next) => {
   let profilePic = await userOperations.getProfilePic(ctx.userData._id);
   if (profilePic.length > 0) {
      ctx.userData.profilePic = profilePic[0].image;
      ctx.userData.imageId = profilePic[0]._id;
   }
   else {
      ctx.userData.profilePic = null;
   }
   next();
}