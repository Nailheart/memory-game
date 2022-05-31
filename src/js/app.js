/** TODO:
  - Добавить логику для new game
  - Добавить ajax
  - Добавить лоадер
  - Добавить aria-label="" з описанием иконки или заменить описание на цифры
  - рефакторинг
  
  Заполнять массив iconsNameList атоматичеки брать имена картинок из папки с иконками.
*/

(() => {
  const gameBoard = document.querySelector('.game__board');
  const gameDifficultView = document.querySelector('.game__difficult');
  const gameDifficultRange = document.querySelector('.game__difficult-range');
  const gameScoreView = document.querySelector('.game__score');
  const newGameButton = document.querySelector('.game__start-button');
  const iconsNameList = ['all_inclusive', 'anchor', 'bedtime', 'bus', 'castle', 'category', 'component', 'coronavirus', 'diamond', 'eco', 'fingerprint', 'gas_station', 'heart', 'hourglass_empty', 'key', 'lock', 'money', 'music_note', 'pan_tool', 'park', 'pets', 'qr_code', 'rainy', 'rocket', 'sailing', 'settings', 'shopping_cart', 'smile', 'star', 'sun', 'water', 'work'];
  let gameScore = 0;
  let cardList = [];

  // display game difficulty
  gameDifficultView.textContent = gameDifficultRange.value * 2;
  gameDifficultRange.addEventListener('input', () => {
    gameDifficultView.textContent = gameDifficultRange.value * 2;
  });

  // add unique cards to cardList
  while (gameDifficultRange.value != cardList.length) {
    const iconIndex = Math.floor(Math.random() * iconsNameList.length);
    cardList.push(iconsNameList[iconIndex]);
    cardList = cardList.filter((item, index) => cardList.indexOf(item) === index);
  }

  // shuffle list
  const shuffleCards = ((arr) => {
    return arr.sort(() => 0.5 - Math.random());
  });

  // create card
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

  // add duplicates
  cardList = cardList.concat(cardList);
  // shuffle cards
  shuffleCards(cardList);
  // add cards to board
  cardList.forEach((card) => {
    createCard(card);
  });

  // flip and check pair
  const cards = document.querySelectorAll('.game__card');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.add('game__card--active');
      card.classList.add('check');
      gameScore++;

      // update display score
      gameScoreView.textContent = gameScore;

      // Check pair
      const cardsActive = document.querySelectorAll('.check');
      if (cardsActive.length == 2) {
        if (cardsActive[0].getAttribute('data-name') !== cardsActive[1].getAttribute('data-name')) {
          setTimeout(() => {
            cardsActive.forEach((card) => {
              card.classList.remove('game__card--active');
            });
          }, 700);
        }

        cardsActive.forEach((card) => {
          card.classList.remove('check');
        });
      }
    });
  });
})();