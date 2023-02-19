import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as shopServices from '../api/shop.js';

const searchTemplate = (shoes, onSearch, params = '', user) => html`
<section id="search">
    <h2>Search by Brand</h2>

    <form class="search-wrapper cf">
        <input id="#search-input" type="text" name="search" placeholder="Search here..." required  .value=${params} />
        <button @click=${onSearch} type="submit">Search</button>
    </form>

    <h3>Results:</h3>

    <div id="search-container">
    <ul class="card-wrapper">
        ${shoes.length > 0
            ? shoes.map(x => previewTemplate(x, user))
            : html `<h2>There are no results found.</h2>`
        }
    </ul>
    </div>
</section>`;

const previewTemplate = (shoe, user) => html`
<li class="card">
    <img src=${shoe.imageUrl} alt="travis" />
    <p>
        <strong>Brand: </strong><span class="brand">${shoe.brand}</span>
    </p>
    <p>
        <strong>Model: </strong><span class="model">1${shoe.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
    ${ user
        ? html `<a class="details-btn" href="/details/${shoe._id}">Details</a>`
        : nothing
    }
</li>`;


export async function searchPage(ctx) {
    const params = ctx.querystring.split('=')[1];
    let shoes = [];

    if(params) {
        shoes = await shopServices.searchShoe(decodeURIComponent(params));
    }

    ctx.render(searchTemplate(shoes, onSearch, params, ctx.user));

    async function onSearch(event) {
        event.preventDefault();
        const searchElement = document.getElementById('#search-input').value;


        const search = await shopServices.searchShoe(searchElement);
        if(search) {
            ctx.page.redirect('/search?query=' + encodeURIComponent(searchElement));
        }
    }
}