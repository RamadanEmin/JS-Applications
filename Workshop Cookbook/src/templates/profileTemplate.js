import { html } from "../../node_modules/lit-html/lit-html.js";

export const profileTemplate = (userData) => html`
    <section id="profilePage">
    ${userData.profilePic
      ? html`<a id="avatarBtn" class="actionLink" href="/profile/change-avatar"><img src="../../assets/change-profile-picture.svg" width=30 height=30> Change profile picture</a>`
      : html`<a id="avatarBtn" class="actionLink" href="/profile/add-avatar"><img src="../../assets/camera.svg" width=25 height=25> Add profile picture</a>`
    }
        <div class="userInfo">
            <div class="avatar"> 
                ${userData.profilePic
                ? html`<img src="${userData.profilePic}">`
                : html`<img src="../../assets/profilePic.png">`
                }
            </div>
            <h2> </h2>
            <h2>${userData.username}: ${country(userData.countrySelect)}</h2>
            <hr>
            
        </div>
        <div id="viewRecipeBtns">
        <a id="myRecipesBtn" class="actionLink" href="/profile/my-recipes"><img src="../../assets/pen-and-paper.svg" width=20 height=20> View Created Recipes</a>
        <a id="favouriteRecipesBtn" class="actionLink" href="/profile/fav-recipes"><img src="../../assets/hearts.svg" width=20 height=20> View Favourite Recipes</a>
        </div>
    </section>`;

    const country = (abbreviation) => {
       switch(abbreviation){
           case `Anynomous` : return `Anynomous`;
           case `AT` : return `Austria 🇦🇹`; 
           case `CH` : return `Switzerland 🇨🇭`; 
           case `BG` : return `Bulgaria 🇧🇬`; 
           case `IT` : return `Italy 🇮🇹`
           case `US` : return `USA 🇺🇸`; 
           case `GB` : return `United Kingdom 🇬🇧`; 
           case `IN` : return `India 🇮🇳`; 
       }
    }