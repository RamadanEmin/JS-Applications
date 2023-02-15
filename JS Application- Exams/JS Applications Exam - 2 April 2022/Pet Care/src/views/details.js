import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as petsServices from '../api/pets.js';

const detailsTemplate = (pet, user, isOwner) => html`
<section id="detailsPage">
    <div class="details">
        <div class="animalPic">
            <img src=${pet.image}>
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${pet.name}</h1>
                <h3>Breed: ${pet.breed}</h3>
                <h4>Age: ${pet.age}</h4>
                <h4>Weight: ${pet.weight}</h4>
                <h4 class="donation">Donation: 0</h4>
            </div>
            
                ${user 
                    ? html `
                        <div class="actionBtn">
                            ${isOwner
                                ? html `<a href="/edit/${pet._id}" class="edit">Edit</a>
                                        <a href="javascript:void(0)" class="remove">Delete</a>`  
                                : html `<a href="javascript:void(0)" class="donate">Donate</a>`}
                        </div>`
                    : nothing
                }   
            </div>
        </div>
    </div>
</section>`;

export async function detailsPage(ctx) {
    const petId = ctx.params.id;
    const pet = await petsServices.getPetById(petId);

    const isOwner = ctx.user._id === pet._ownerId;

    ctx.render(detailsTemplate(pet, ctx.user, isOwner));
}