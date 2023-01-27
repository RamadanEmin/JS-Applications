import { homePage } from "./home.js";

export async function onDelete(e, element, movie) {
  e.preventDefault();
  element.remove();

  await fetch(`http://localhost:3030/data/movies/${movie._id}`, {
    method: 'delete',
    headers: {
      'X-Authorization': JSON.parse(localStorage.getItem('user')).accessToken
    }
  });
  homePage();
}