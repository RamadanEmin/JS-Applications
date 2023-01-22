const baseUrl = 'http://localhost:3030/jsonstore/blog';
const select = document.getElementById('posts');
const btnViewPosts = document.getElementById('btnViewPost');
const title = document.getElementById('post-title');
const body = document.getElementById('post-body');
const postComments = document.getElementById('post-comments');

const loadPostsBtn = document.getElementById('btnLoadPosts');
loadPostsBtn.addEventListener('click', loadPosts);

async function loadPosts() {
    try {
        const response = await fetch(baseUrl + '/posts');
        const data = await response.json();

        select.innerHTML = '';
        for (const key in data) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = data[key].title;
            select.appendChild(option);
        }

        btnViewPosts.addEventListener('click', () => viewPosts(data));
    } catch (error) {
        console.log(error.message);
    }
}

async function viewPosts(dataSelect) {
    try {
        const response = await fetch(baseUrl + '/comments');
        const data = await response.json();

        const comments = Object
            .values(data)
            .filter(obj => select.value === obj.postId);

        const selectedOption = [...select.options]
            .find(o => o.value === select.value);

        title.textContent = selectedOption.textContent;
        body.textContent = dataSelect[select.value].body;

        postComments.innerHTML = '';
        comments.forEach(comment => {
            const li = document.createElement('li');
            li.id = comment.id;
            li.textContent = comment.text;
            postComments.appendChild(li);
        });
    } catch (error) {
        console.log(error.message);
    }
}


// function attachEvents() {
//     document.getElementById('btnLoadPosts').addEventListener('click', getAllPosts);
//     document.getElementById('btnViewPost').addEventListener('click', displayPost);
// }

// attachEvents();

// async function displayPost() {
//     const titleElement = document.getElementById('post-title');
//     const bodyElement = document.getElementById('post-body');
//     const UlElement = document.getElementById('post-comments');

//     titleElement.textContent = 'Loading...';
//     bodyElement.textContent='';
//     UlElement.replaceChildren();

//     const selectedId = document.getElementById('posts').value;

//     const [post, comments] = await Promise.all([
//         getPostById(selectedId),
//         getCommentsByPostId(selectedId)
//     ]);

//     titleElement.textContent = post.title;
//     bodyElement.textContent = post.body;

//     comments.forEach(c => {
//         const liElement = document.createElement('li');
//         liElement.textContent = c.text;
//         UlElement.appendChild(liElement);
//     });
// }

// async function getAllPosts() {
//     const res = await fetch('http://localhost:3030/jsonstore/blog/posts');
//     const data = await res.json();

//     const selectElement = document.getElementById('posts');
//     selectElement.replaceChildren();
//     Object
//         .values(data)
//         .forEach(p => {
//             const optionElement = document.createElement('option');
//             optionElement.value = p.id;
//             optionElement.textContent = p.title;
//             selectElement.appendChild(optionElement);
//         })
// }

// async function getPostById(postId) {
//     const res = await fetch('http://localhost:3030/jsonstore/blog/posts/' + postId);
//     const data = await res.json();
//     return data;
// }

// async function getCommentsByPostId(postId) {
//     const res = await fetch('http://localhost:3030/jsonstore/blog/comments');
//     const data = await res.json();

//     const comments = Object.values(data).filter(c => c.postId === postId);
//     return comments;
// }