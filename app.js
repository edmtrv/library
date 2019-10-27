const bookLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = false;
}

Book.prototype.info = function() {
  const status = this.read ? 'Read' | 'Not Read'
  return `${this.title} | ${this.author} | ${this.pages} pages | ${status}`;
}

function addBookToLibrary(name, author, pages) {
  const bookToAdd = new Book(name, author, pages);
  bookLibrary.push(bookToAdd);
}
