const gamesLibrary = [];

function Game(title, genre, price, description) {
  this.title = title;
  this.genre = genre;
  this.price = price;
  this.description = description;
  this.playTime = 0;
}

Book.prototype.info = function() {
  const status = this.read ? 'Read' : 'Not Read';
  return `${this.title} | ${this.author} | ${this.pages} pages | ${status}`;
}

function addGameToLibrary(title, genre, price, description) {
  const gameToAdd = new Game(name, author, pages);
  gamesLibrary.push(gameToAdd);
}
