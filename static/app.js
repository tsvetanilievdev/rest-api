document.querySelector('button').addEventListener('click', loadData);
const form = document.querySelector('form')
form.addEventListener('submit', createData);
const list = document.querySelector('ul');
list.addEventListener('click', itemAction);

let editMode = false;
let currentId = null;

async function loadData() {
    const data = await fetch('http://localhost:3000');
    const jsonData = await data.json();

    list.replaceChildren();
    jsonData.list.forEach(createListItem)
}

function createListItem(item) {
    const li = document.createElement('li');
    li.id = item.id;
    li.textContent = `${item.name} - $ ${item.price} `;
    const btnDetails = createAction('[Details]', 'details');
    const btnEdit = createAction('[Edit]', 'edit');
    const btnDelete = createAction('[Delete]', 'delete');

    li.appendChild(btnDetails);
    li.appendChild(btnEdit);
    li.appendChild(btnDelete);
    list.appendChild(li);
}

function createAction(content, className) {
    const btn = document.createElement('a');
    btn.textContent = content;
    btn.className = className;
    btn.href = 'javascript:void(0)';
    return btn;
}

async function createData(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    let item = null;

    if (editMode) {
        const res = await fetch('http://localhost:3000/' + currentId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        if (res.ok) {
            loadData();
            form.querySelector('input[type="submit"]').value = 'Create Item';
            form.reset();
            editMode = false;
            currentId = null;
        }

    } else {
        const res = await fetch('http://localhost:3000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        item = await res.json();
        form.reset();
        createListItem(item);
    }
}
async function itemAction(event) {
    if (event.target.tagName == 'A') {
        event.preventDefault();
        const id = event.target.parentElement.id;

        if (event.target.classList.contains('delete')) {
            await deleteItem(id);
        } else if (event.target.classList.contains('details')) {
            await detailsItem(id);
        } else if (event.target.classList.contains('edit')) {
            const item = await detailsItem(id);
            populateEditForm(item);
        }


    }
}
function populateEditForm(item) {
    editMode = true;
    currentId = item.id;
    form.querySelector('[name="name"]').value = item.name;
    form.querySelector('[name="price"]').value = item.price;
    form.querySelector('input[type="submit"]').value = 'Save';
}

async function detailsItem(id) {
    const res = await fetch('http://localhost:3000/' + id)
    if (!res.ok) {
        return
    }
    const item = await res.json()
    return item;
}

async function deleteItem(id) {
    console.log(id)
    const res = await fetch('http://localhost:3000/' + id, {
        method: 'DELETE'
    })
    if (!res.ok) {
        return
    }
    document.getElementById(id).remove();
}

async function editItem(id, editedItem) {
    const res = await fetch('http://localhost:3000/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedItem)
    })
    if (!res.ok) {
        return
    }
    const item = await res.json();
    return item;
}