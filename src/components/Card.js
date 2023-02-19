export default class Card {
  constructor({
    data,
    handleCardClick,
    handleLikeClick,
    checkLikeActive,
    handleDeleteButton,
  }) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._checkLikeActive = checkLikeActive;
    this._handleDeleteButton = handleDeleteButton;
  }
  _handleLikeButton = (e) => {
    e.target.classList.toggle("card__like-icon_active");
  };
  _setCardValues = (cardElement) => {
    const image = cardElement.querySelector(".card__image");
    const likesNumber = cardElement.querySelector(".card__like-number");
    const cardContainer = cardElement.querySelector(".card");
    image.src = this._link;
    image.alt = `Imagen de ${this._name}`;
    cardContainer.dataset.id = this._id;
    cardElement.querySelector(".card__title").textContent = this._name;
    cardElement.querySelector(".card__like-number").textContent =
      this._likes.length;
    if (this._likes.length == 0) {
      likesNumber.classList.remove("card__like-number_visible");
    }
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
      .addEventListener("click", this._handleLikeClick);
    cardElement
      .querySelector(".card__delete-icon")
      .addEventListener("click", () => {
        this._handleDeleteButton(this._id);
      });
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
    this._checkLikeActive(cardElement);
    return cardElement;
  };
}
