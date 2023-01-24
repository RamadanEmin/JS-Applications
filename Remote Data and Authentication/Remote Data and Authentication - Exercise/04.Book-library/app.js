const url = 'http://localhost:3030/jsonstore/collections/books';
const tbody = document.querySelector('tbody');
const submitBtn = document.querySelector('form button');
const h3 = document.querySelector('form h3');
let id;

document.getElementById('loadBooks').addEventListener('click', loadAllBooks);
document.querySelector('form').addEventListener('submit', onSubmit);
tbody.addEventListener('click', updateOrDeleteBook);

async function loadAllBooks() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error while loads all books');
        }
        const data = await response.json();

        tbody.innerHTML = '';
        Object.entries(data).map(createBookRecord);
    } catch (error) {
        alert(error.message);
    }
}

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get('title');
    const author = formData.get('author');

    if (!title || !author) {
        return;
    }
    try {
        let response;

        submitBtn.textContent === 'Submit'
            ? response = await getResponse('post', url, { title, author })
            : response = await getResponse('put', `${url}/${id}`, { title, author });

        if (!response.ok) {
            throw new Error('Error in submit');
        }
        loadAllBooks();
        h3.textContent = 'FORM';
        submitBtn.textContent = 'Submit';
        e.target.reset();

    } catch (error) {
        alert(error.message);
    }
}

function updateOrDeleteBook(e) {
    id = e.target.parentNode.id;

    if (e.target.textContent === 'Edit') {
        h3.textContent = 'Edit FORM';
        submitBtn.textContent = 'Save';

        document.querySelector('[name="title"]').value = e.target.parentNode.parentNode.children[0].textContent;
        document.querySelector('[name="author"]').value = e.target.parentNode.parentNode.children[1].textContent;

    } else if (e.target.textContent === 'Delete') {
        fetch(`${url}/${id}`, {
            method: 'delete'
        });
        e.target.parentNode.parentNode.remove();
    }
}

async function getResponse(methodType, url, data) {
    const response = await fetch(url, {
        method: methodType,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response;
}

function createBookRecord([key, { title, author }]) {
    const tr = createElement('tr', tbody);
    createElement('td', tr, title);
    createElement('td', tr, author);

    const td = createElement('td', tr);
    td.id = key;
    createElement('button', td, 'Edit');
    createElement('button', td, 'Delete');
}

function createElement(tag, parent, content) {
    const element = document.createElement(tag);
    if (content) {
        element.textContent = content;
    }
    parent.appendChild(element);
    return element;
}

/*const tbody = document.querySelector('tbody');
const createForm=document.getElementById('createForm');
const editForm=document.getElementById('editForm');

document.getElementById('loadBooks').addEventListener('click', loadBooks);
createForm.addEventListener('submit', onCreate);
editForm.addEventListener('submit', onEditSubmit);
tbody.addEventListener('click', onTableClick);

loadBooks();

async function onEditSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);

    const id = formData.get('id');
    const author = formData.get('author');
    const title = formData.get('title');

    const result = await updateBook(id,{ author, title });
  
    e.target.reset();
    createForm.style.display='block';
    editForm.style.display='none';

    loadBooks();
}

function onTableClick(e) {
    if (e.target.className === 'delete') {
        onDelete(e.target);
    } else if (e.target.className === 'edit') {
        onEdit(e.target);
    }
}

async function onEdit(button) {
    const id = button.parentElement.dataset.id;
    const book=await loadBooksById(id);

    createForm.style.display='none';
    editForm.style.display='block';

    editForm.querySelector('[name="id"]').value=id;
    editForm.querySelector('[name="author"]').value=book.author;
    editForm.querySelector('[name="title"]').value=book.title;
}

async function onDelete(button) {
    const id = button.parentElement.dataset.id;
    await deleteBook(id);
    button.parentElement.parentElement.remove();
}

async function onCreate(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const author = formData.get('author');
    const title = formData.get('title');

    const result = await createBook({ author, title });
    tbody.appendChild(createRow(result._id, result));
    e.target.reset();

}

async function loadBooks() {

    const books = await request('http://localhost:3030/jsonstore/collections/books');

    const result = Object.entries(books).map(([id, book]) => createRow(id, book))
    tbody.replaceChildren(...result);
}

async function loadBooksById(id) {
    const book = await request('http://localhost:3030/jsonstore/collections/books/' + id);
    return book;
}

function createRow(id, book) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${book.title}</td>
                     <td>${book.author}</td>
                     <td data-id=${id}>
                         <button class="edit">Edit</button>
                         <button class="delete">Delete</button>
                     </td>`;
    return row;
}

async function createBook(book) {
    const result = await request('http://localhost:3030/jsonstore/collections/books', {
        method: 'post',
        body: JSON.stringify(book)
    });

    return result;
}

async function updateBook(id, book) {
    const result = await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'put',
        body: JSON.stringify(book)
    });

    return result;
}

async function deleteBook(id) {
    const result = await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'delete',
    });

    return result;
}

async function request(url, options) {
    if (options && options.body !== undefined) {
        Object.assign(options, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        alert(error.message);
    }
}*/