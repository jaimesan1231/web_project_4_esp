import { initialCards } from "./data.js";

import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { hidePopup, loadEditFormData } from "./utils.js";
import {
  addForm,
  cardsContainer,
  description,
  descriptionInput,
  editForm,
  formList,
  name,
  nameInput,
} from "./constants.js";

const createCardElement = (card, container) => {
  const newCard = new Card(card);
  const cardElement = newCard.generateCard();
  container.prepend(cardElement);
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
editForm.addEventListener("submit", handleEditProfileFormSubmit);
addForm.addEventListener("submit", handleAddCardFormSubmit);
