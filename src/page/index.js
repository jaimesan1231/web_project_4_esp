import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  addButton,
  cardsContainer,
  jobInput,
  editButton,
  formList,
  nameInput,
  initialCards,
  profileImage,
} from "../scripts/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import previewPopup from "../components/PopupWithImage.js";
import userInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import { Api } from "../components/Api";

//Config api
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_es_cohort_04",
  headers: {
    authorization: "64b42335-e161-40b8-8c1c-d5789010cc5e",
    "content-type": "application/json",
  },
});

//User info
api
  .getUserInfo()
  .then((response) => response.json())
  .then((data) => {
    userInfo.setUserInfo({ name: data.name, job: data.about });
    profileImage.src = data.avatar;
    console.log(data);
  });

const loadEditFormData = () => {
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
};
//Add Popup
const popupAddForm = new PopupWithForm("#add-popup", (inputValues) => {
  const newCard = new Card(inputValues, (e) => {
    previewPopup.setEventListeners();
    previewPopup.open({
      link: e.target.src,
      title: e.target.alt.substring(10),
    });
  });
  const cardElement = newCard.generateCard();
  cardsContainer.prepend(cardElement);
});
popupAddForm.setEventListeners();

//Edit Popup

const popupEditForm = new PopupWithForm("#edit-popup", (inputValues) => {
  userInfo.setUserInfo(inputValues);
});

popupEditForm.setEventListeners();

//Section
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = new Card(item, (e) => {
        previewPopup.setEventListeners();
        previewPopup.open({
          link: e.target.src,
          title: e.target.alt.substring(10),
        });
      });
      const cardElement = newCard.generateCard();
      cardSection.addItem(cardElement);
    },
  },
  ".cards-container"
);

//Load initial data
document.addEventListener("DOMContentLoaded", () => {
  loadEditFormData();
  //add form validators
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
  //render cards
  cardSection.renderItems();
});

//Event Listeners
editButton.addEventListener("click", () => {
  loadEditFormData();
  popupEditForm.open();
});
addButton.addEventListener("click", () => popupAddForm.open());
