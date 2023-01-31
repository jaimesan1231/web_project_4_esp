export default class Card {
  constructor({ title, link }, _handleCardClick) {
    this._name = title;
    this._link = link;
    this._handleCardClick = _handleCardClick;
  }
  _setCardValues = (cardElement) => {
    const image = cardElement.querySelector(".card__image");
    image.src = this._link;
    image.alt = `Imagen de ${this._name}`;
    cardElement.querySelector(".card__title").textContent = this._name;
  };

  _handleLikeButton = (e) => {
    e.target.classList.toggle("card__like-icon_active");
  };
  _handleDeleteButton = (e) => {
    e.target.closest(".card").remove();
  };
  _hidePopup = () => {
    const poupContainer = document.querySelector(".popup_opened");
    document.removeEventListener("keydown", this._handleExitPopupKey);
    poupContainer.classList.remove("popup_opened");
    const form = poupContainer.querySelector(".form");
    form.reset();
  };
  _handleExitPopupKey = (e) => {
    if (e.key === "Escape") {
      hidePopup(e);
    }
  };
  _handleExitPopupClick = (e) => {
    if (e.target.classList.contains("popup")) {
      hidePopup(e);
    }
  };
  _openPopup = (popup) => {
    document.addEventListener("keydown", this._handleExitPopupKey);
    popup.classList.add("popup_opened");
  };
  _addCardEventHandlers = (cardElement) => {
    cardElement
      .querySelector(".card__like-icon")
      .addEventListener("click", this._handleLikeButton);
    cardElement
      .querySelector(".card__delete-icon")
      .addEventListener("click", this._handleDeleteButton);
    cardElement
      .querySelector(".card__image")
      .addEventListener("click", this._handleCardClick);
  };
  generateCard = () => {
    const cardElement = document
      .querySelector("#card-template")
      .content.cloneNode(true);
    this._setCardValues(cardElement);
    this._addCardEventHandlers(cardElement);
    return cardElement;
  };
}
