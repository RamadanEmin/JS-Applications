import { searchBooks } from '../api/data.js';
import { html } from '../lib.js';
import { bookPreview } from './common.js';

const searchTemplate = (books, onSearch, params = '') => html`
<section id="search-page" class="edit">
    <form @submit=${onSearch}>
        <input type="text" name="search" .value=${params}>
        <input class="button submit" type="submit" value="Search">
    </form>
    ${books.length === 0
        ? html`<p class="no-books">No results!</p>`
        : html`<ul class="other-books-list">${books.map(bookPreview)}</ul>`}
</section>`;

export async function searchPage(ctx) {
    const params = ctx.querystring.split('=')[1];
    let books = [];

    if (params) {
        books = await searchBooks(decodeURIComponent(params));
    }

    ctx.render(searchTemplate(books, onSearch, params));

    async function onSearch(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const search = formData.get('search').trim();

        if (search) {
            ctx.page.redirect('/search?query=' + encodeURIComponent(search));
        }
    }
} 