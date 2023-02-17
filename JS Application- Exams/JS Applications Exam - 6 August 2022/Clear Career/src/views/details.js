import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as jobsServices from '../api/jobs.js';

const detailsTemplate = (offer, user, isOwner) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${offer.imageUrl} alt="example1" />
        <p id="details-title">${offer.title}</p>
        <p id="details-category">
            Category: <span id="categories">${offer.category}</span>
        </p>
        <p id="details-salary">
            Salary: <span id="salary-number">${offer.salary}</span>
        </p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Description</h4>
                <span>${offer.description}</span>
            </div>
            <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${offer.requirements}</span>
            </div>
        </div>
        <p>Applications: <strong id="applications">0</strong></p>

        ${user
            ? html `<div id="action-buttons">
                ${isOwner
                    ? html `<a href="/edit/${offer._id}" id="edit-btn">Edit</a>
                            <a href="javascript:void(0)" id="delete-btn">Delete</a>`
                    : html `<a href="javascript:void(0)" id="apply-btn">Apply</a>`}                       
                    </div>`
            : nothing 
        }      
          
    </div>
</section>`;


export async function detailsPage(ctx) {
    const offerId = ctx.params.id;
    const offer = await jobsServices.getOfferById(offerId);
    
    const isOwner = ctx.user && ctx.user._id === offer._ownerId;

    ctx.render(detailsTemplate(offer, ctx.user, isOwner));

}
