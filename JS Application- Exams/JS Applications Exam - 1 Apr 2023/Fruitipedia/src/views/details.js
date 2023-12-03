import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as fruitServices from "../api/fruits.js";

const detailsTemplate = (fruit, user, isOwner, onDelete) => html`
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src=${fruit.imageUrl} alt="example1" />
      <p id="details-title">${fruit.name}</p>
      <div id="info-wrapper">
        <div id="details-description">
          <p>${fruit.description}</p>
          <p id="nutrition">Nutrition</p>
          <p id="details-nutrition">${fruit.nutrition}</p>
        </div>
        ${user && isOwner
        ? html`
              <div id="action-buttons">
                <a href="/edit/${fruit._id}" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn"
                  >Delete</a
                >
              </div>
            `
        : nothing}
      </div>
    </div>
  </section>
`;

export async function detailsPage(ctx) {
    const dataId = ctx.params.id;

    const fruit = await fruitServices.getFruit(dataId);

    const isOwner = ctx.user && ctx.user._id === fruit._ownerId;

    ctx.render(detailsTemplate(fruit, ctx.user, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm("Are you sure you want to delete this fruit?");
        if (choice) {
            await fruitServices.deleteFruit(dataId);

            ctx.page.redirect("/catalog");
        }
    }
}