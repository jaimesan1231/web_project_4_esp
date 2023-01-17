const imagePopup = document.querySelector("#image-popup");
export default class Card {
  constructor(data) {
    this._name = data.name;
    this._link = data.link;
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
  _handleImagePopup = (e) => {
    this._openPopup(imagePopup);
    imagePopup.querySelector(".popup__image").src = e.target.src;
    imagePopup.querySelector(".popup__image-title").textContent =
      e.target.alt.substring(10);
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
      .addEventListener("click", this._handleImagePopup);
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
