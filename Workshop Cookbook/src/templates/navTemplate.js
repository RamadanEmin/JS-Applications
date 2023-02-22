import { html } from "../../node_modules/lit-html/lit-html.js";

export const navUserTemplate = () => html`
<a id="catalogLink" href="/catalog">Catalog</a>
<div id="user">
    <a id="myRecipesLink" href="/profile">My Profile</a>
    <a id="createLink" href="/create">Create Recipe</a>
    <a id="logoutBtn" href="/logout">Logout</a>
</div>
`

export const navGuestTemplate = () => html`
<a id="catalogLink" href="/catalog">Catalog</a>
<div id="guest">
    <a id="loginLink" href="/login">Login</a>
    <a id="registerLink" href="/register">Register</a>
</div>
`