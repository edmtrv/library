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


// INTERFACE

function render() {
  booksLibrary.forEach(book => {
    const bookDiv = showBook(book);
    booksUI.append(bookDiv);
  });
}

function showBook(book) {
  const div = document.createElement('div');

  div.classList.add('book');
  div.textContent = createBookText(book);

  return div;
}

function createBookText(book) {
  const status = book.read ? 'Read' : 'Not Read';
  const text = `${book.title} | ${book.author} | ${book.pages} pages | ${status}`;

  return text;
}

const booksUI = document.querySelector('.books');

render();
