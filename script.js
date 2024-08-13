let Library = [];

const addBtt = document.getElementById("addBtt");
const bookForm = document.querySelector(".bookForm");
const form = document.querySelector(".form");
const cancel = document.querySelector(".cancel");
const container = document.querySelector('.main');

function on() {
    bookForm.style.display = "flex";
}

function off() {
    bookForm.style.display = "none";
}

function add() {
    const title = document.querySelector('input[name="title"]').value;
    const author = document.querySelector('input[name="author"]').value;
    const pages = document.querySelector('input[name="pages"]').value;
    const isRead = document.querySelector('input[name="read"]').checked;

    const newBook = new Book(title, author, pages, isRead);
    Library.push(newBook);
    displayBook(newBook);

    form.reset();
    off();
}

function displayBook(book) {
    const cell = document.createElement('div');
    cell.classList.add('cell');

    cell.innerHTML = `
    <h3>${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>Pages: ${book.pages}</p>
    <button class="toggle-read ${book.isRead ? 'read' : ''}">${book.isRead ? 'Read' : 'Not Read'}</button>
    <button class="remove-book">Remove</button>
    `;

    const toggleRead = cell.querySelector('.toggle-read');
    toggleRead.addEventListener('click', () => toggleReadStatus(book, toggleRead));

    const removeBookButton = cell.querySelector('.remove-book');
    removeBookButton.addEventListener('click', () => removeBook(book, cell));

    container.appendChild(cell);
}

function toggleReadStatus(book, button) {
    book.isRead = !book.isRead;
    button.classList.toggle('read', book.isRead);
    button.textContent = book.isRead ? 'Read' : 'Not Read';
}

function removeBook(book, cell) {
    Library = Library.filter(a => a !== book);
    container.removeChild(cell);
}

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

addBtt.addEventListener("click", on);
cancel.addEventListener("click", off);

document.querySelector('.form').addEventListener('submit', function(event) {
event.preventDefault();
add();
});
