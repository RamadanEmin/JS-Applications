import { editItem, getById } from '../api/data.js';
import { html, until } from '../lib.js';

const editTemplate = (itemPromise) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
    ${until(itemPromise, html`<p>Loading&hellip;</p>`)}
</div>`;

const formTemplate = (item, onSubmit, errorMsg, errors) => html`
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class=${'form-control' + (errors.make ? ' is-invalid' : '')} id="new-make" type="text"
                            name="make" .value=${item.make}>
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class=${'form-control' + (errors.model ? ' is-invalid' : '')} id="new-model" type="text"
                            name="model" .value=${item.model}>
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class=${'form-control' + (errors.year ? ' is-invalid' : '')} id="new-year" type="number"
                            name="year" .value=${item.year}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class=${'form-control' + (errors.description ? ' is-invalid' : '')} id="new-description"
                            type="text" name="description" .value=${item.description}>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class=${'form-control' + (errors.price ? ' is-invalid' : '')} id="new-price" type="number"
                            name="price" .value=${item.price}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class=${'form-control' + (errors.img ? ' is-invalid' : '')} id="new-image" type="text"
                            name="img" .value=${item.img}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material" .value=${item.material}>
                    </div>
                    ${errorMsg ? html`<div class="form-group error">${errorMsg}</div>` : null}
                    <input type="submit" class="btn btn-info" value="Edit" />
                </div>
            </div>
        </form>`;

export function editPage(ctx) {
    const itemPromise = getById(ctx.params.id);
    update(itemPromise, null, {});

    function update(itemPromise, errorMsg, errors) {
        ctx.render(editTemplate(loadItem(itemPromise, errorMsg, errors)));
    }

    async function loadItem(itemPromise, errorMsg, errors) {
        const item = await itemPromise;

        return formTemplate(item, onSubmit, errorMsg, errors);
    }

    async function onSubmit(event) {
        event.preventDefault();
        const formData = [...(new FormData(event.target)).entries()];
        const data = formData.reduce((a, [k, v]) => Object.assign(a, { [k]: v.trim() }), {});

        const missing = formData.filter(([k, v]) => k != 'material' && v.trim() == '');

        try {
            if (missing.length > 0) {
                const errors = missing.reduce((a, [k, v]) => Object.assign(a, { [k]: true }), {});
                throw {
                    error: new Error('Please fill all mandatory fields!'),
                    errors
                };
            }

            data.year = Number(data.year);
            data.price = Number(data.price);

            if (data.make.length < 4 || data.model.length < 4) {
                throw {
                    error: new Error('At least 4 symbols long!'),
                    errors: {
                        make: data.make.length < 4,
                        model: data.model.length < 4
                    }
                };
            }

            if (data.year < 1950 || data.year > 2050) {
                throw {
                    error: new Error('Year must be between 1950 nad 2050!'),
                    errors: {
                        year: data.year < 1950 || data.year > 2050
                    }
                };
            }

            if (data.description.length <= 10) {
                throw {
                    error: new Error('Description must be more than 10 symbols!'),
                    errors: {
                        description: data.description.length < 11
                    }
                };
            }

            if (Number.isInteger(data.price) === false || data.price < 0) {
                throw {
                    error: new Error('Price must be a positive number!'),
                    errors: {
                        price: Number.isInteger(data.price) === false || data.price < 0
                    }
                };
            }

            const result = await editItem(ctx.params.id, data);
            event.target.reset();
            ctx.page.redirect('/details/' + result._id);
        } catch (err) {
            const message = err.message || err.error.message;
            update(data, message, err.errors || {});
        }
    }
}