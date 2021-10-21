export default class Field {
  constructor() {
    this.gamefield = document.querySelector('.game__field');
    this.fieldRect = gamefield.getBoundingClientRect();

    this.gamefield.addEventListener('click', () => {});
  }

  setClickListener(fnc) {
    this.onClick = fnc;
  }
}
