const bookLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = false;
}

function addBookToLibrary(name, author, pages) {
  const bookToAdd = new Book(name, author, pages);
  bookLibrary.push(bookToAdd);
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
  const status = book.read ? 'Read' : 'Not Read';
  const html = `${book.title} | ${book.author} | ${book.pages} pages | ${status}`;

  div.classList.add('book');
  div.textContent = html;

  return div;
}

const booksUI = document.querySelector('.books');
