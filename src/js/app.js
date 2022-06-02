(() => {
  const gameBoard = document.querySelector('.game__board');
  const gameDifficultView = document.querySelector('.game__difficult');
  const gameDifficultRange = document.querySelector('.game__difficult-range');
  const gameScoreView = document.querySelector('.game__score');
  const newGameButton = document.querySelector('.game__start-button');
  const iconsNameList = ['all_inclusive', 'anchor', 'bedtime', 'bus', 'castle', 'category', 'component', 'coronavirus', 'diamond', 'eco', 'fingerprint', 'gas_station', 'heart', 'hourglass_empty', 'key', 'lock', 'money', 'music_note', 'pan_tool', 'park', 'pets', 'qr_code', 'rainy', 'rocket', 'sailing', 'settings', 'shopping_cart', 'smile', 'star', 'sun', 'water', 'work'];
  let gameScore = 0;

  // draw quantity cards
  gameDifficultView.textContent = gameDifficultRange.value * 2;

  // update quantity cards handler
  gameDifficultRange.addEventListener('input', () => {
    gameDifficultView.textContent = gameDifficultRange.value * 2;
  });

  // start new game hander
  newGameButton.addEventListener('click', (e) => {
    e.preventDefault();
    newGame();
  });

  // flip handler
  gameBoard.addEventListener('click', (e) => {
    const element = e.target;

    if (element.classList.contains('game__card') && !element.classList.contains('game__card--active')) {
      element.classList.add('game__card--active');
      element.classList.add('check');
      gameScoreView.textContent = ++gameScore;
      checkMatch();
    }
  });

  // start new game
  const newGame = (() => {
    gameScore = 0;
    gameScoreView.textContent = 0;
    gameBoard.replaceChildren();
    generateCards();
  });

  // shuffle cards
  const shuffleCards = ((arr) => arr.sort(() => 0.5 - Math.random()));

  // create card node
  const createCard = ((iconName) => {
    const card = document.createElement('div');
    card.classList.add('game__card');
    card.setAttribute('data-name', iconName);
    card.innerHTML = `
      <svg class="game__card-icon" width="48" height="48">
        <use href="img/sprite.svg#${iconName}"></use>
      </svg>
    `;
    gameBoard.append(card);
  });

  // check match
  const checkMatch = (() => {
    const cards = document.querySelectorAll('.check');
    if (cards.length >= 2) {
      let data = [];
      cards.forEach((card) => data.push(card.getAttribute('data-name')));

      for (let i = 1; i < data.length; i++) {
        if (data[0] !== data[i]) {
          setTimeout(() => {
            cards.forEach((card) => card.classList.remove('game__card--active'));
          }, 700);
          break;
        }
      }

      cards.forEach((card) => card.classList.remove('check'));
    }
  });

  // generation cards on board
  const generateCards = (() => {
    let cardList = [];

    while (gameDifficultRange.value != cardList.length) {
      const iconIndex = Math.floor(Math.random() * iconsNameList.length);
      cardList.push(iconsNameList[iconIndex]);
      cardList = cardList.filter((item, index) => cardList.indexOf(item) === index);
    }

    cardList = cardList.concat(cardList);
    shuffleCards(cardList);
    cardList.forEach((card) => createCard(card));
  });
  generateCards();
})();