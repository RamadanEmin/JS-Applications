import { html, until } from "../lib.js";

const editTemplate = (moviePromise) => html`
<section id="edit-movie">
    ${until(moviePromise, html`<p>Loading&hellip;</p>`)}
</section>`;

const formTemplate = (movie, onSubmit) => html`
<form class="text-center border border-light p-5" action="#" method="">
    <h1>Edit Movie</h1>
    <div class="form-group">
        <label for="title">Movie Title</label>
        <input type="text" class="form-control" placeholder="Movie Title" .value=${movie.title} name="title">
    </div>
    <div class="form-group">
        <label for="description">Movie Description</label>
        <textarea class="form-control" placeholder="Movie Description..." name="description" .value=${movie.description}></textarea>
    </div>
    <div class="form-group">
        <label for="imageUrl">Image url</label>
        <input type="text" class="form-control" placeholder="Image Url" value="" name="imageUrl" .value=${movie.img}>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>`;

export function editPage(ctx) {
    ctx.render(editTemplate(loadMovie(ctx)));

}

async function loadMovie(ctx) {
    const movie = await ctx.moviePromise;

    return formTemplate(movie, onSubmit);

    async function onSubmit(event) {

    }
}