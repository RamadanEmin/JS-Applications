import { showView, spinner } from "./util.js";

const section = document.querySelector('#movie-example');

export function detailsPage(id) {
    showView(section);
    displayMovie(id);
}

async function displayMovie(id) {
    section.replaceChildren(spinner());

    const user = JSON.parse(localStorage.getItem('user'));

    const [movie, likes, ownLike] = await Promise.all([
        getMovie(id),
        getLikes(id),
        getOwnLike(id, user)
    ]);
    section.replaceChildren(createMovieCard(movie, user, likes, ownLike));
}

function createMovieCard(movie, user, likes, ownLike) {
    const element = document.createElement('div');
    element.className = 'container',
        element.innerHTML = `<div class="row bg-light text-dark">
                                <h1>Movie title: ${movie.title}</h1>
                                <div class="col-md-8">
                                    <img class="img-thumbnail" src="${movie.img}" alt="Movie">
                                </div>
                                <div class="col-md-4 text-center">
                                    <h3 class="my-3 ">Movie Description</h3>
                                    <p>${movie.description}</p>
                                    ${createControls(movie, user, ownLike)}  
                                    <span class="enrolled-span">Liked ${likes}</span>
                                </div>
                             </div>`;

    const likeBtn = element.querySelector('.like-btn');
    const editBtn = element.querySelector('.btn-warning');
    const deleteBtn = element.querySelector('.btn-danger');

    if (likeBtn) {
        likeBtn.addEventListener('click', (e) => likeMovie(e, movie._id, ownLike));
    }
    return element;
}

function createControls(movie, user, ownLike) {
    const isOwner = user && user._id === movie._ownerId;

    let controls = [];

    if (isOwner) {
        controls.push('<a class="btn btn-danger" href="#">Delete</a>');
        controls.push('<a class="btn btn-warning" href="#">Edit</a>');
    } else if (user && ownLike == false) {
        controls.push('<a class="btn btn-primary like-btn" href="#">Like</a>');
    }

    return controls.join('');
}

async function getMovie(id) {
    try {
        const res = await fetch(`http://localhost:3030/data/movies/${id}`);
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }
        const movie = await res.json();

        return movie;
    } catch (err) {
        alert(err.message);
    }
}

async function getLikes(id) {
    try {
        const res = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }
        const likes = await res.json();

        return likes;
    } catch (err) {
        alert(err.message);
    }
}

async function getOwnLike(movieId, user) {
    if (!user) {
        return false;
    } else {
        const userId = user._id;
        try {
            const res = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`);
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }
            const like = await res.json();

            return like.length > 0;
        } catch (err) {
            alert(err.message);
        }
    }
}

async function likeMovie(e, movieId, ownLike) {
    e.preventDefault();
    ownLike = true;
    try {

        const res = await fetch('http://localhost:3030/data/likes', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': JSON.parse(localStorage.getItem('user')).accessToken
            },
            body: JSON.stringify({ movieId })
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }
        const like =await res.json();
        detailsPage(movieId);
    } catch (err) {
        alert(err.message);
    }
}