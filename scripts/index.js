import { initialCards } from "./data.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeIcon = document.querySelectorAll(".popup__close-icon");
const editPopup = document.querySelector("#edit-popup");
const addPopup = document.querySelector("#add-popup");
const nameInput = document.querySelector("#name");
const descriptionInput = document.querySelector("#description");
const addForm = document.querySelector("#add-form");
const editForm = document.querySelector("#edit-form");
const name = document.querySelector(".profile__name");
const description = document.querySelector(".profile__description");
const cardsContainer = document.querySelector(".cards-container");
const popupList = document.querySelectorAll(".popup");
const formList = document.querySelectorAll(".form");

const showEditPopup = () => {
  loadEditFormData();
  openPopup(editPopup);
};
const hidePopup = () => {
  const poupContainer = document.querySelector(".popup_opened");
  document.removeEventListener("keydown", handleExitPopupKey);
  poupContainer.classList.remove("popup_opened");
  const form = poupContainer.querySelector(".form");
  if (form) {
    form.reset();
    const labelList = form.querySelectorAll(".form__label");
    labelList.forEach((labelElement) => {
      const input = labelElement.querySelector(".form__input");
      const error = labelElement.querySelector(".form__input-error");
      input.classList.remove("form__input_type_error");
      error.classList.remove("form__input-error_visible");
    });
    const button = form.querySelector(".form__button");
    button.classList.add("form__button_disabled");
  }
};

const createCardElement = (card, container) => {
  const newCard = new Card(card);
  const cardElement = newCard.generateCard();
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
  formList.forEach((formElement) => {
    const newFormValidator = new FormValidator(
      {
        errorSelector: ".form__input-error",
        labelSelector: ".form__label",
        inputSelector: ".form__input",
        submitButtonSelector: ".form__button",
        inactiveButtonClass: "form__button_disabled",
        inputErrorClass: "form__input_type_error",
        errorClass: "form__input-error_visible",
      },
      formElement
    );
    newFormValidator.enableValidation();
  });
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
closeIcon.forEach((button) => {
  button.addEventListener("click", hidePopup);
});
popupList.forEach((popupElement) => {
  popupElement.addEventListener("click", handleExitPopupClick);
});
