import { userOperations } from "../services/user-services.js";
import { addProfilePicTemplate } from "../templates/addProfilePicTemplate.js";

export const profilePicView = (ctx) => {
  ctx.renderTemplate(addProfilePicTemplate());
  let imageContainer = document.querySelector(`#profileImage`);
  let imageInput = document.querySelector(`#addImage`);
  imageInput.addEventListener(`change`, (e) => {
    imageContainer.removeAttribute(`src`);
    imageContainer.removeAttribute(`alt`);
    if (e.currentTarget.value !== ``) {
      imageContainer.setAttribute(`src`, e.currentTarget.value);
      imageContainer.setAttribute(`alt`, `Profile pic here`);
    }
  });
  let submitImgBtn = document.querySelector(`#submitImage`).addEventListener(`click`, function (e) { onClick(e, ctx, imageInput) });
}

const onClick = async (e, ctx, imageInput) => {
  e.preventDefault();
  if (imageInput.value !== ``) {
    let image = imageInput.value;
    let userDetails = await userOperations.addProfilePic({ image });
    ctx.page.redirect('/profile');
  }
  else {
    ctx.showNotification(`Please enter an image adress`, `errorBox`);
  }
}