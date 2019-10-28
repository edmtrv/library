// Backend

const booksLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = false;
}

function addBookToLibrary(name, author, pages) {
  const bookToAdd = new Book(name, author, pages);
  booksLibrary.push(bookToAdd);
}


// UI

function render() {
  booksLibrary.forEach(book => {
    renderBook(book, booksUI);
  });
}

function renderBook(book, on) {
  const div = document.createElement('div');

  div.classList.add('book');
  div.textContent = createBookText(book);

  on.append(div);
}

function createBookText(book) {
  const status = book.read ? 'Read' : 'Not Read';
  const text = `${book.title} | ${book.author} | ${book.pages} pages | ${status}`;

  return text;
}

function handleAddBook() {

}


const booksUI = document.querySelector('.books');
const addBookBtn = document.querySelector('.add-book');

addBookBtn.addEventListener('click', handleAddBook);

render();
