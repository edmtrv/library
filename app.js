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
