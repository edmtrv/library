const gamesLibrary = [];

function Game(title, genre, price, description) {
  this.title = title;
  this.genre = genre;
  this.price = price;
  this.description = description;
  this.hoursPlayed = 0;
}

Game.prototype.addTime = function(minutes) {
  this.hoursPlayed += (minutes / 60);
}

function addGameToLibrary(title, genre, price, description) {
  const gameToAdd = new Game(name, author, pages);
  gamesLibrary.push(gameToAdd);
}
