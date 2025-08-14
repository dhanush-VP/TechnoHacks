const userForm = document.getElementById('userForm');
const userTable = document.getElementById('userTable');
let editIndex = null;

function fetchUsers() {
  fetch('/users')
    .then(res => res.json())
    .then(data => {
      userTable.innerHTML = '';
      data.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>
            <button class="edit-btn" onclick="editUser(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteUser(${index})">Delete</button>
          </td>
        `;
        userTable.appendChild(row);
      });
    });
}

userForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  if (editIndex === null) {
    fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    }).then(fetchUsers);
  } else {
    fetch(`/users/${editIndex}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    }).then(fetchUsers);
    editIndex = null;
  }

  userForm.reset();
});

function editUser(index) {
  fetch('/users')
    .then(res => res.json())
    .then(data => {
      document.getElementById('name').value = data[index].name;
      document.getElementById('email').value = data[index].email;
      editIndex = index;
    });
}

function deleteUser(index) {
  fetch(`/users/${index}`, { method: 'DELETE' })
    .then(fetchUsers);
}

fetchUsers();
