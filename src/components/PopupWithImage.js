import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }
  open(card) {
    super.open();
    this._element.querySelector(".popup__image").src = card.link;
    this._element.querySelector(".popup__image-title").textContent = card.title;
  }
}

const previewPopup = new PopupWithImage("#image-popup");

export default previewPopup;
