import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as petsServices from '../api/pets.js';

const detailsTemplate = (pet, user, isOwner, totalDonation, hasDonation, onDelete, onDonation) => html`
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
                <h4 class="donation">Donation: ${totalDonation * 100}$</h4>
            </div>
            
                ${user && !hasDonation
                    ? html `
                        <div class="actionBtn">
                            ${isOwner
                                ? html `<a href="/edit/${pet._id}" class="edit">Edit</a>
                                        <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>`  
                                : html `<a @click=${onDonation} href="javascript:void(0)" class="donate">Donate</a>`}
                        </div>`
                    : nothing
                }   
            </div>
        </div>
    </div>
</section>`;

export async function detailsPage(ctx) {
    const petId = ctx.params.id;
    const userId = ctx.user._id;

    const request = [
        petsServices.getPetById(petId),
        petsServices.getAllDonationCount(petId)
    ];

    if (ctx.user) {
        request.push(petsServices.getDonationById(petId, userId));
    }

    const [pet, totalDonation, hasDonation] = await Promise.all(request);

    const isOwner = ctx.user._id === pet._ownerId;

    ctx.render(detailsTemplate(pet, ctx.user, isOwner, totalDonation, hasDonation, onDelete, onDonation));

    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete pet with name ${pet.name}`);
        if (choice) {
            petsServices.deletePet(petId);

            ctx.page.redirect('/');
        }
    }

    async function onDonation() {
        await petsServices.addDonation({ petId });

        ctx.page.redirect('/details/' + petId);
    }
}