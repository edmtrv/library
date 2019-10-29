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
  const gameToAdd = new Game(title, genre, price, description);
  gamesLibrary.push(gameToAdd);
}

// UI

function render() {
  if (gamesLibrary.length > 0) gamesUI.innerHTML = '';
  let row;
  gamesLibrary.forEach((game, index) => {
    if (index % 3 == 0) {
      row = document.createElement('div');
      row.classList.add('row', 'mt-3');
      gamesUI.append(row);
    }
    renderGame(game, row);
  });
}

function renderGame(game, row) {
  const col = document.createElement('div');

  col.classList.add('col-4');
  const card = createGameCard(game);
  col.innerHTML = card;
  row.append(col);
}

function createGameCard({title, genre, price, description, hoursPlayed}) {
  return `<article class="card"><section class="card-body"><h5 class="card-title">${title}</h5><h6 class="card-subtitle mb-1">${genre}</h6><h6 class="card-subtitle mb-1">€${price}</h6><h6 class="card-subtitle mb-2">Hours Played: ${hoursPlayed}</h6><p class="card-text">${description}</p><button class="btn btn-outline-danger mr-1">Remove</button><button class="btn btn-outline-primary">Add Time</button></section></article>`;
}

function handleAddGame() {
  console.log(e);
}


const gamesUI = document.querySelector('.games');
const addBookBtn = document.querySelector('.add-game');

addBookBtn.addEventListener('click', handleAddGame);

addGameToLibrary('GTA V', 'Action', 29.99, 'The game is played from either a third-person or first-person perspective, and its world is navigated on foot or by vehicle. Players control the three lead protagonists throughout single-player and switch between them both during and outside missions.');

addGameToLibrary('Tom Clancy\'s Rainbow Six Siege', 'Shooter', 49.99, 'Each player assumes control of an attacker or a defender in different gameplay modes such as rescuing a hostage, defusing a bomb, and taking control of a capture point. The title has no campaign but features a series of short missions that can be played solo.');

addGameToLibrary('eFootball Pro Evolution Soccer 2020', 'Sports', 69.99,'The new game features a name change with the addition of \'eFootball\' within the title, symbolizing a push in the online gaming space with a focus on PESLeague and eFootball Pro tournaments.');

addGameToLibrary('Rise of Industry', 'Tycoon', 17.99, 'The game sees players build and manage their industrial empire as they attempt to grow and expand in the early 20th century.');

render();
