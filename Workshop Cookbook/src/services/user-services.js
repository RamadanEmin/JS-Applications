import { apiRequests } from "./api.js";
import { authOperations } from "../utils/authentication.js";

const endpoints = {
    register: `users/register`,
    login: `users/login`,
    logout: `users/logout`,
    getUserDetails: `users/me/`,
    profile_pictures: `data/profilePictures`
};

async function registerUser(data) {
    let userResponse = await apiRequests.post(endpoints.register, data);
    if (userResponse.hasOwnProperty(`url`)) {
        err = await userResponse.json();
        err.status = `not-ok`;
        return err;
    }
    else {
        userResponse.status = `ok`;
        authOperations.saveUser(userResponse);
        return userResponse;
    }
}
async function loginUser(data) {
    let userResponse = await apiRequests.post(endpoints.login, data);
    if (userResponse.hasOwnProperty(`url`)) {
        err = await userResponse.json();
        err.status = `not-ok`;
        return err;
    }
    else {
        userResponse.status = `ok`;
        authOperations.saveUser(userResponse);
        return userResponse;
    }
}
async function logoutUser() {
    await apiRequests.get(endpoints.logout);
    authOperations.clearStorage();
}

async function addProfilePic(data) {
    let newPic = await apiRequests.post(`${endpoints.profile_pictures}`, data);
    return newPic;
}

async function getProfilePic(userId) {
    let query = `?where=_ownerId%3D%22${encodeURIComponent(userId)}%22`;
    let pic = await apiRequests.get(endpoints.profile_pictures + query);
    return pic;
}

async function updateProfilePic(imageId, data) {
    await apiRequests.put(`${endpoints.profile_pictures}/${imageId}`, data);
}
export const userOperations = {
    registerUser,
    loginUser,
    logoutUser,
    addProfilePic,
    getProfilePic,
    updateProfilePic
};