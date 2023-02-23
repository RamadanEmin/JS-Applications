import { changeProfilePicTemplate } from "../templates/changeProfilePicTemplate.js";
import { userOperations } from "../services/user-services.js";


export async function changeProfilePicView(ctx) {
    let profilePic = await userOperations.getProfilePic(ctx.userData._id);
    let [imageUrl, imageId] = [profilePic[0].image, profilePic[0]._id];
    ctx.renderTemplate(changeProfilePicTemplate(imageUrl, imageId));
    const imageInput = document.querySelector(`#addImage`);
    imageInput.value = imageUrl;
    const profileImage = document.querySelector(`#profileImage`);

    imageInput.addEventListener(`change`, (e) => {
        profileImage.removeAttribute(`src`);
        profileImage.removeAttribute(`alt`);
        if (e.currentTarget.value !== ``) {
            profileImage.setAttribute(`src`, e.currentTarget.value);
            profileImage.setAttribute(`alt`, `Profile pic here`);
        }
    });

    const changeImageBtn = document.querySelector(`#submitImage`).addEventListener(`click`, function (e) {
        change(e, ctx, imageInput, imageId)
    });
}

async function change(e, ctx, imageInput, imageId) {
    e.preventDefault();
    if (imageInput.value !== ``) {
        let image = imageInput.value;
        await userOperations.updateProfilePic(imageId, { image });
        ctx.page.redirect('/profile');
    }
    else {
        ctx.showNotification(`Please enter valid image adress`, `errorBox`);
    }
}