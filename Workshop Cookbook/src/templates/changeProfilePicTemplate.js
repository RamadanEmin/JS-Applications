import { html } from "../../node_modules/lit-html/lit-html.js";

export const changeProfilePicTemplate = (imageUrl) => html `
   <div class="avatar" id="profilePic"> 
        <img id="profileImage" src="${imageUrl}" alt="Profile pic here!">
    </div>  
    <div class="section-title">
    <form id="searchForm">
        <input type="text" name="addImage" id="addImage">
        <input id="submitImage" type="submit" value="Add image">
    </form>
    </div>
`;