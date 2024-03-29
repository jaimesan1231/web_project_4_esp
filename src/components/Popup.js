export default class Popup {
  constructor(selector) {
    this._element = document.querySelector(selector);
    this._bindHandleEscClose = this._handleEscClose.bind(this);
  }
  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    this._element.addEventListener("click", (e) => {
      if (e.target.classList.contains("popup")) {
        this.close();
      }
    });
    this._element
      .querySelector(".popup__close-icon")
      .addEventListener("click", () => {
        this.close();
      });
  }
  open() {
    this._element.classList.add("popup_opened");
    document.addEventListener("keydown", this._bindHandleEscClose);
  }
  close() {
    this._element.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._bindHandleEscClose);
  }
}
