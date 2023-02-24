import { html,nothing } from "../../node_modules/lit-html/lit-html.js";

export const commentsTemplate = (recipe, comments, user, isOwner, onCommentSubmit, ctx) => html`
<div class="section-title">
    ${comments.length > 0
    ? `Comments for ${recipe.name}`
    : `No comments yet..`}
</div>
<div class="comments">
    <ul>
        ${comments.length > 0
        ? html`${comments.map(comment => commentCard(comment))}`
        : nothing}
    </ul>
</div>
${user
 ? html`${isOwner
         ? nothing
         : commentFormTemplate(onCommentSubmit, ctx)
        }`
 : nothing}`;

const commentFormTemplate = (onCommentSubmit, ctx) => html`
<article class="new-comment">  
    <h2>New comment</h2>
    <form id="commentForm" @submit = ${function(e){onCommentSubmit(e, ctx)}}>
        <textarea name="content" placeholder="Type comment"></textarea>
        <input type="submit" value="Add comment">
    </form>
</article>`;

const commentCard = (data) => html`
<li class="comment">
    <header><img class="commentUserPic" src="../../../assets/anonymous-pic.png" width=50 height=50> ${data.author.email}</header>
    <p>${data.content}</p>
</li>`;