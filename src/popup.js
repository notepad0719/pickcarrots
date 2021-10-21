export default class PopUp {
  constructor() {
    this.popup = document.querySelector('.pop-up');
    this.popupMsg = document.querySelector('.pop-up__message');
    this.refreshBtn = document.querySelector('.pop-up__refresh');
    this.refreshBtn.addEventListener('click', () => {
      this.onclick && this.onclick();
    });
  }
  setClickListener(fnc) {
    this.onclick = fnc;
  }
  showWithText(msg) {
    this.popup.classList.remove('pop-up--hide');
    this.popupMsg.innerHTML = msg;
  }

  hide() {
    this.popup.classList.add('pop-up--hide');
  }
}
