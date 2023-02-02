import { getMovieById } from "./api/data.js";

export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

export function setUserData(data) {
    sessionStorage.setItem('userData', JSON.stringify(data));
}

export function clearUserData() {
    sessionStorage.removeItem('userData');
}

export function loadMovie(ctx, next) {
    const moviePromise = getMovieById(ctx.params.id);
    ctx.moviePromise = moviePromise;
    next();
}