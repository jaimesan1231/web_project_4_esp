import { initialCards } from "./data.js";
import { resetValidation } from "./validate.js";
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeIcon = document.querySelectorAll(".popup__close-icon");
const editPopup = document.querySelector("#edit-popup");
const addPopup = document.querySelector("#add-popup");
const imagePopup = document.querySelector("#image-popup");
const nameInput = document.querySelector("#name");
const descriptionInput = document.querySelector("#description");
const addForm = document.querySelector("#add-form");
const editForm = document.querySelector("#edit-form");
const name = document.querySelector(".profile__name");
const description = document.querySelector(".profile__description");
const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".cards-container");
const popupList = document.querySelectorAll(".popup");

const showEditPopup = () => {
  loadEditFormData();
  openPopup(editPopup);
};
const hidePopup = () => {
  const poupContainer = document.querySelector(".popup_opened");
  document.removeEventListener("keydown", handleExitPopupKey);
  poupContainer.classList.remove("popup_opened");
  const form = poupContainer.querySelector(".form");
  form.reset();
  resetValidation(form, {
    errorSelector: ".form__input-error",
    labelSelector: ".form__label",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_visible",
  });
};
const handleImagePopup = (e) => {
  openPopup(imagePopup);
  imagePopup.querySelector(".popup__image").src = e.target.src;
  imagePopup.querySelector(".popup__image-title").textContent =
    e.target.alt.substring(10);
};
const handleLikeButton = (e) => {
  e.target.classList.toggle("card__like-icon_active");
};
const handleDeleteButton = (e) => {
  e.target.closest(".card").remove();
};
const setCardValues = (card, cardElement) => {
  const { name, link } = card;
  const image = cardElement.querySelector(".card__image");
  image.src = link;
  image.alt = `Imagen de ${name}`;
  cardElement.querySelector(".card__title").textContent = card.name;
};
const addCardEventHandlers = (cardElement) => {
  cardElement
    .querySelector(".card__like-icon")
    .addEventListener("click", handleLikeButton);
  cardElement
    .querySelector(".card__delete-icon")
    .addEventListener("click", handleDeleteButton);
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", handleImagePopup);
};
const createCardElement = (card, container) => {
  const cardElement = cardTemplate.cloneNode(true);
  setCardValues(card, cardElement);
  addCardEventHandlers(cardElement);
  container.prepend(cardElement);
};
const loadEditFormData = () => {
  nameInput.value = name.textContent;
  descriptionInput.value = description.textContent;
};
const handleEditProfileFormSubmit = (e) => {
  e.preventDefault();
  name.textContent = nameInput.value;
  description.textContent = descriptionInput.value;
  hidePopup(e);
};
const handleAddCardFormSubmit = (e) => {
  e.preventDefault();
  const titleInput = document.querySelector("#title");
  const linkInput = document.querySelector("#link");
  createCardElement(
    { name: titleInput.value, link: linkInput.value },
    cardsContainer
  );
  titleInput.value = "";
  linkInput.value = "";
  hidePopup(e);
};
const handleExitPopupClick = (e) => {
  if (e.target.classList.contains("popup")) {
    hidePopup(e);
  }
};
const handleExitPopupKey = (e) => {
  if (e.key === "Escape") {
    hidePopup(e);
  }
};
document.addEventListener("DOMContentLoaded", () => {
  loadEditFormData();
  initialCards.forEach((card) => {
    createCardElement(card, cardsContainer);
  });
});
const openPopup = (popup) => {
  document.addEventListener("keydown", handleExitPopupKey);
  popup.classList.add("popup_opened");
};
editButton.addEventListener("click", showEditPopup);
editForm.addEventListener("submit", handleEditProfileFormSubmit);
addForm.addEventListener("submit", handleAddCardFormSubmit);
addButton.addEventListener("click", () => openPopup(addPopup));
Array.from(closeIcon).forEach((button) => {
  button.addEventListener("click", hidePopup);
});
Array.from(popupList).forEach((popupElement) => {
  popupElement.addEventListener("click", handleExitPopupClick);
});
