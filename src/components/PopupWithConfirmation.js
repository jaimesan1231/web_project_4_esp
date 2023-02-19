import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(selector, handleButtonClick) {
    super(selector);
    this._handleButtonClick = handleButtonClick;
  }
  setEventListeners() {
    super.setEventListeners();
    this._element
      .querySelector(".form__button")
      .addEventListener("click", this._handleButtonClick);
  }
  open(id) {
    super.open();
    this._element.querySelector(".form__button").dataset.id = id;
  }
}
