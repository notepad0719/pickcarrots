const btn_start = document.querySelector('.menu-btn_start');
const menu_timer = document.querySelector('.menu_time');
const menu_counter = document.querySelector('.menu_count');
const gamefield = document.querySelector('.bg_gamefield');
const carrot = document.querySelector('.carrot');
const bug = document.querySelector('.bug');
const popup = document.querySelector('.popup');
const popup_msg = document.querySelector('.popup_message');
const popup_btn = document.querySelector('.popup-btn_restart');

btn_start.addEventListener('click', startOrStop);
gamefield.addEventListener('click', (e) => selectItem(e));
popup_btn.addEventListener('click', () => {
  popup.classList.add('popup_hide');
  newGame();
});

let STATUS = false;
let timerID;
let CARROT_COUNT;
let BUG_COUNT;

function startOrStop() {
  if (STATUS) {
    newGame();
  } else {
    STATUS = 'off';
    showPopup('Restart?');
    clearInterval(timerID);
    timerID = null;
  }
}

function newGame() {
  STATUS = 'on';
  CARROT_COUNT = 5;
  BUG_COUNT = 10;
  initAllItems(gamefield);
  changeBtnStop(); // 시작 버튼-> 중지버튼
  showTimer(); // 남은 시간 출력
  showCounter(); // 당근 카운트 출력
  printItems('bug', BUG_COUNT, 'img/bug.png'); // 게임 필드에 당근 출력
  printItems('carrot', CARROT_COUNT, 'img/carrot.png'); // 게임 필드에 벌레 출력
}

function initAllItems(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  menu_timer.innerHTML = '';
}

function changeBtnStop() {
  btn_start.innerHTML = '<i class="fas fa-stop"></i>';
}

function showTimer() {
  const initialTime = 10;
  menu_timer.classList.remove('menu_time_hide');
  menu_timer.innerHTML = initialTime;
  calcTime(initialTime);
}

function calcTime(time) {
  timerID = setInterval(() => {
    menu_timer.innerHTML = time - 1;
    time--;
    if (time === 0) {
      endGame();
    }
  }, 1000);
}
function showCounter() {
  menu_counter.classList.remove('menu_count_hide');
  menu_counter.innerHTML = `${CARROT_COUNT}`;
}

function countCarrot() {
  CARROT_COUNT = document.querySelectorAll('.carrot').length;
  menu_counter.innerHTML = `${CARROT_COUNT}`;

  if (CARROT_COUNT === 0) {
    winGame();
  }
}

function printItems(item, number, url) {
  for (let i = 0; i < number; i++) {
    const items = document.createElement('img');
    items.setAttribute('src', `${url}`);
    items.setAttribute('class', `${item}`);
    gamefield.appendChild(items);
    calcCoords(items);
  }
}

function calcCoords(items) {
  const minX = gamefield.getBoundingClientRect().left;
  const minY = gamefield.getBoundingClientRect().top;
  const maxX = gamefield.getBoundingClientRect().right - 80;
  const maxY = gamefield.getBoundingClientRect().bottom - 80;
  const x = Math.floor(Math.random() * (maxX - minX)) + minX;
  const y = Math.floor(Math.random() * (maxY - minY)) + minY;

  items.style.position = 'absolute';
  items.style.left = `${x}px`;
  items.style.top = `${y}px`;
}

function selectItem(e) {
  const eventTarget = e.target;
  console.log(e.target);

  if (eventTarget.className == 'carrot') {
    deleteCarrot(eventTarget); // 화면에서 당근 삭제
    countCarrot(); // 당근 카운트
  } else if (eventTarget.className == 'bug') {
    endGame();
  }
}

function endGame() {
  STATUS = 'off';
  clearInterval(timerID);
  timerID = null;
  menu_timer.classList.add('menu_time_hide');
  menu_counter.classList.add('menu_count_hide');
  showPopup('defeated');
}
function deleteCarrot(eventTarget) {
  eventTarget.remove();
}

function winGame() {
  STATUS = 'off';
  clearInterval(timerID); //타이머 멈추기
  timerID = null;
  showPopup('you have won!'); //팝업 출력, 다시시작하기, + 멘트
}

function showPopup(msg) {
  popup.classList.remove('popup_hide');
  popup_msg.innerHTML = msg;
}
