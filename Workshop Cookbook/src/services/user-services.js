import { apiRequests } from "./api.js";
import { authOperations } from "../utils/authentication.js";

const endpoints = {
    register: `users/register`,
    login: `users/login`,
    logout: `users/logout`
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

export const userOperations = {
    registerUser,
    loginUser,
    logoutUser
};