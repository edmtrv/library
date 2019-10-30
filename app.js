
let gamesLibrary = createLibrary(localStorage.getItem('games')) || [];

function createLibrary(gamesData) {
  if (!gamesData) return;

  const library = [];
  const parsedData = JSON.parse(gamesData);

  for (let item of parsedData) {
    library.push(new Game(...Object.values(item)));
  }

  return library;
}

function Game(title, genre, price, description, hoursPlayed = 0) {
  this.title = title;
  this.genre = genre;
  this.price = price;
  this.description = description;
  this.hoursPlayed = hoursPlayed;
}

Game.prototype.addTime = function(minutes) {
  this.hoursPlayed += (+minutes / 60);
  localStorage.setItem('games', JSON.stringify(gamesLibrary));
}

function addGameToLibrary(title, genre, price, description) {
  const gameToAdd = new Game(title, genre, price, description);
  gamesLibrary = [
    ...gamesLibrary,
    gameToAdd
  ];
  localStorage.setItem('games', JSON.stringify(gamesLibrary));
}

function removeGameFromLibrary(id) {
  gamesLibrary = [
    ...gamesLibrary.slice(0, id),
    ...gamesLibrary.slice(id + 1)
  ];
  localStorage.setItem('games', JSON.stringify(gamesLibrary));
}

// UI

function render() {
  // if (gamesLibrary.length == 0) allCards.innerHTML = '<p>No games yet</p>';
  let row;
  gamesLibrary.forEach((game, index) => {
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

function createGameCard({title, genre, price, description, hoursPlayed}, id) {
  return `<article class="card"><section class="card-body"><h5 class="card-title">${title}</h5><h6 class="card-subtitle mb-2">Genre: ${genre}</h6><h6 class="card-subtitle mb-2">Price: €${price}</h6><h6 class="card-subtitle mb-3">Hours Played: ${hoursPlayed.toFixed(2)}</h6><p class="card-text">${description}</p><div class="d-flex"><div class="mr-2"><button class="btn btn-outline-danger remove-game" data-game="${id}">Remove</button></div><div class="mr-1"><button class="btn btn-outline-primary add-time" data-game="${id}">Add Time</button></div><div class="w-25"><label for="minutes" class="sr-only">Minutes Played</label><input type="number" name="minutes" id="minutes-${id}" class="form-control" placeholder="Mins"></div></div>
  </section></article>`;
}

function handleAddGame() {
  const formFields = document.querySelector('.add-game-form').elements;
  const game = [];

  for (let field of formFields) {
    game.push(field.value);
    field.value = '';
  }

  addGameToLibrary(...game);
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
  removeGameFromLibrary(id);
  render();
}

function handleAddTime(btn) {
  const id = btn.dataset.game;
  const minutes = document.getElementById(`minutes-${id}`).value;
  if (minutes === '') return;
  const game = gamesLibrary[id];
  console.log(game);
  game.addTime(minutes);
  render();
}

const allCards = document.querySelector('.games');
const addGameBtn = document.querySelector('.add-game');
const addTimeBtn = document.querySelector('.add-time');

addGameBtn.addEventListener('click', handleAddGame);
allCards.addEventListener('click', handleClickOnGames);


// addGameToLibrary('GTA V', 'Action', 29.99, 'The game is played from either a third-person or first-person perspective, and its world is navigated on foot or by vehicle. Players control the three lead protagonists throughout single-player and switch between them both during and outside missions.');

// addGameToLibrary('Tom Clancy\'s Rainbow Six Siege', 'Shooter', 49.99, 'Each player assumes control of an attacker or a defender in different gameplay modes such as rescuing a hostage, defusing a bomb, and taking control of a capture point. The title has no campaign but features a series of short missions that can be played solo.');

// addGameToLibrary('eFootball Pro Evolution Soccer 2020', 'Sports', 69.99,'The new game features a name change with the addition of \'eFootball\' within the title, symbolizing a push in the online gaming space with a focus on PESLeague and eFootball Pro tournaments.');

// addGameToLibrary('Rise of Industry', 'Tycoon', 17.99, 'The game sees players build and manage their industrial empire as they attempt to grow and expand in the early 20th century.');


render();
