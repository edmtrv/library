class Library {
  constructor() {
    this.games = this._parseData(localStorage.getItem('games')) || [];
  }

  addGame(title, genre, price, description) {
    const game = new Game(title, genre, price, description);
    this.games = [...this.games, game];
    localStorage.setItem('games', JSON.stringify(this.games));
  }

  removeGame(id) {
    this.games = [...this.games.slice(0, id), ...this.games.slice(id + 1)];
    localStorage.setItem('games', JSON.stringify(this.games));
  }

  _parseData(data) {
    if (!data) return;
    const games = [];
    const parsed = JSON.parse(data);

    for (let item of parsed) {
      games.push(new Game(...Object.values(item)));
    }

    return games;
  }
}

class Game {
  constructor(title, genre, price, description, hoursPlayed = 0) {
    this.title = title;
    this.genre = genre;
    this.price = price;
    this.description = description;
    this.hoursPlayed = hoursPlayed;
  }

  addTime(minutes) {
    this.hoursPlayed += +minutes / 60;
    localStorage.setItem('games', JSON.stringify(library.games));
  }
}

let library = new Library();

// UI

function render() {
  allCards.innerHTML = '';
  if (library.games.length == 0) allCards.innerHTML = '<p>No games yet</p>';
  let row;
  library.games.forEach((game, index) => {
    if (index % 3 == 0) {
      row = document.createElement('div');
      row.classList.add('row', 'mt-3');
      allCards.append(row);
    }
    renderGame(game, index, row);
  });
}

function renderGame(game, id, row) {
  const col = document.createElement('div');

  col.classList.add('col-4');
  const card = createGameCard(game, id);
  col.innerHTML = card;
  row.append(col);
}

function createGameCard({ title, genre, price, description, hoursPlayed }, id) {
  return `<article class="card"><section class="card-body"><h5 class="card-title">${title}</h5><h6 class="card-subtitle mb-2">Genre: ${genre}</h6><h6 class="card-subtitle mb-2">Price: €${price}</h6><h6 class="card-subtitle mb-3">Hours Played: ${hoursPlayed.toFixed(
    2
  )}</h6><p class="card-text">${description}</p><div class="d-flex"><div class="mr-2"><button class="btn btn-outline-danger remove-game" data-game="${id}">Remove</button></div><div class="mr-1"><button class="btn btn-outline-primary add-time" data-game="${id}">Add Time</button></div><div class="w-25"><label for="minutes" class="sr-only">Minutes Played</label><input type="number" name="minutes" id="minutes-${id}" class="form-control" placeholder="Mins"></div></div>
  </section></article>`;
}

function handleAddGame(e) {
  e.preventDefault();
  const formFields = e.target.elements;
  const game = [];

  for (let field of formFields) {
    game.push(field.value);
    field.value = '';
  }

  library.addGame(...game);
  $('#newGameModal').modal('hide');
  render();
}

function handleClickOnGames(e) {
  if (e.target.classList.contains('remove-game')) {
    handleRemoveGame(e.target);
  } else if (e.target.classList.contains('add-time')) {
    handleAddTime(e.target);
  }
}

function handleRemoveGame(btn) {
  const id = +btn.dataset.game;
  library.removeGame(id);
  render();
}

function handleAddTime(btn) {
  const id = btn.dataset.game;
  const minutes = document.getElementById(`minutes-${id}`).value;
  if (minutes === '') return;
  const game = library.games[id];
  game.addTime(minutes);
  render();
}

const allCards = document.querySelector('.games');
const addGameForm = document.querySelector('.add-game-form');
const addTimeBtn = document.querySelector('.add-time');

addGameForm.addEventListener('submit', handleAddGame);
allCards.addEventListener('click', handleClickOnGames);

render();
