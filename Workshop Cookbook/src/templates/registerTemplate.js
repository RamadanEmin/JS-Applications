import { html } from "../../node_modules/lit-html/lit-html.js";

export const registerTemplate = () => html`
<section id="register">
    <article>
        <h2>Register</h2>
        <form id="registerForm">
            <label>Username: <input type="text" name="username"></label>
            <label>E-mail: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat: <input type="password" name="rePass"></label>
           <span>Country(optional):</span>
            <select id="countrySelect" name="countrySelect">
                <option class="countryOption" value="Anynomous">None</option>
                <option class="countryOption" value="AT">AT 🇦🇹</option>
                <option class="countryOption" value="CH">CH 🇨🇭</option>
                <option class="countryOption" value="BG">BG 🇧🇬</option>
                <option class="countryOption" value="IT">IT 🇮🇹</option>
                <option class="countryOption" value="US">US 🇺🇸</option>
                <option class="countryOption" value="GB">GB 🇬🇧</option>
                <option class="countryOption" value="IN">IN 🇮🇳</option>
            </select>
            <input type="submit" value="Register">
        </form>
    </article>
</section>`;
