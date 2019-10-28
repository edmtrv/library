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

// UI

function render() {
  gamesLibrary.forEach(game => {
    renderGame(game, gamesUI);
  });
}

function renderGame(game, on) {
  const div = document.createElement('div');

  div.classList.add('game');
  div.textContent = game;

  on.append(div);
}


const gamesUI = document.querySelector('.games');
const addBookBtn = document.querySelector('.add-game');

addBookBtn.addEventListener('click', handleAddGame);

render();
