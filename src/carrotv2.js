import PopUp from './popup.js';
const gameBtn = document.querySelector('.game__button');
const timerBoard = document.querySelector('.game__timer');
const scoreBoard = document.querySelector('.game__score');
const gamefield = document.querySelector('.game__field');
const fieldRect = gamefield.getBoundingClientRect();

let started = false;
let timerId;
let score = 0;

let CARROT_COUNT = 5;
let BUG_COUNT = 10;
let IMG_SIZE = 80;
let TIME_DURATION_SEC = 10;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(startGame);
gamefield.addEventListener('click', onFieldClick);
gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

function onFieldClick() {
  const target = event.target;
  console.log(target);
  if (target.className === 'bug') {
    finishGame(false);
  } else if (target.className === 'carrot') {
    score++;
    target.remove();
    updateScoreBoard();
    checkScore();
  }
}

function checkScore() {
  if (CARROT_COUNT === score) {
    finishGame(true);
  }
}

function stopGame() {
  started = false;
  gameBtn.innerHTML = '<i class="fas fa-stop"></i>';
  stopTimer();
  gameFinishBanner.showWithText('Restart?');
}

function startGame() {
  started = true;
  showTimerBoard();
  showScoreBoard();
  startTimer();
  initGame();
}

function startTimer() {
  let remainingTime = TIME_DURATION_SEC;
  updateTimerBoard(remainingTime);
  timerId = setInterval(() => {
    if (remainingTime <= 0) {
      finishGame(false);
    }
    updateTimerBoard(--remainingTime);
  }, 1000);
}

function finishGame(win) {
  started = false;
  stopTimer();
  hideGameBtn();
  hideTimerBoard();
  hideScoreBoard();
  gameFinishBanner.showWithText(win ? 'you have won!' : 'defeated');
}
function hideGameBtn() {
  gameBtn.style.visibility = 'hidden';
}

function hideTimerBoard() {
  timerBoard.style.visibility = 'hidden';
}

function hideScoreBoard() {
  scoreBoard.style.visibility = 'hidden';
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

function updateTimerBoard(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerBoard.innerHTML = `${minutes} : ${seconds} `;
}

function showTimerBoard() {
  timerBoard.style.visibility = 'visible';
}

function showScoreBoard() {
  updateScoreBoard();
  scoreBoard.style.visibility = 'visible';
}

function updateScoreBoard() {
  scoreBoard.innerHTML = CARROT_COUNT - score;
}
function initGame() {
  score = 0;
  gamefield.innerHTML = '';
  gameBtn.style.visibility = 'visible';
  gameFinishBanner.hide();

  addItem('carrot', CARROT_COUNT, 'img/carrot.png');
  addItem('bug', BUG_COUNT, 'img/bug.png');
}

function addItem(className, count, imgPath) {
  const minX = 0;
  const minY = 0;
  const maxX = fieldRect.width;
  const maxY = fieldRect.height;

  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('src', imgPath);
    item.classList.add(className);
    gamefield.appendChild(item);

    const x = randomNumber(minX, maxX - IMG_SIZE);
    const y = randomNumber(minY, maxY - IMG_SIZE);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    item.style.position = 'absolute';
  }
}

function randomNumber(a, b) {
  a = Math.ceil(a);
  b = Math.floor(b);
  return Math.floor(Math.random() * (b - a)) + a;
}
