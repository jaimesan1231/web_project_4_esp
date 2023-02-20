import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  addButton,
  editButton,
  formList,
  profileImageContainer,
} from "../scripts/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import previewPopup from "../components/PopupWithImage.js";
import userInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import api from "../components/Api.js";
import {
  editProfileAvatar,
  editProfileInfo,
  getInitialData,
  loadEditFormData,
  postCard,
  putLike,
  removeLike,
  deletePopup,
} from "../scripts/utils.js";

//Avatar Popup
const popupAvatarForm = new PopupWithForm(
  "#avatar-popup",
  (button, inputValue) => {
    const { avatar } = inputValue;
    editProfileAvatar(button, avatar, popupAvatarForm);
  }
);
popupAvatarForm.setEventListeners();

//Add Popup
const popupAddForm = new PopupWithForm("#add-popup", (button, inputValues) => {
  postCard(button, inputValues, popupAddForm);
});
popupAddForm.setEventListeners();

//Edit Popup

const popupEditForm = new PopupWithForm(
  "#edit-popup",
  (button, inputValues) => {
    editProfileInfo(button, inputValues, popupEditForm);
  }
);
popupEditForm.setEventListeners();

//Section
const loadInitialCards = () => {
  api
    .getInitialCards()
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
    .then((data) => {
      renderInitialCards(data);
    });
};

const renderInitialCards = (initialCards) => {
  const cardSection = new Section(
    {
      items: initialCards,
      renderer: (item) => {
        const newCard = new Card({
          data: item,
          handleCardClick: (e) => {
            previewPopup.setEventListeners();
            previewPopup.open({
              link: e.target.src,
              title: e.target.alt.substring(10),
            });
          },
          handleLikeClick: (e) => {
            if (e.target.classList.contains("card__like-icon_active")) {
              removeLike(e, item._id);
            } else {
              putLike(e, item._id);
            }
          },
          checkLikeActive: (cardElement) => {
            const userId = userInfo.getUserId();
            if (item.owner._id !== userId) {
              cardElement
                .querySelector(".card__delete-icon")
                .classList.remove("card__delete-icon_visible");
            }

            if (item.likes.find((item) => item._id == userId)) {
              const likeIcon = cardElement.querySelector(".card__like-icon");
              likeIcon.classList.add("card__like-icon_active");
            }
          },
          handleDeleteButton: (id) => deletePopup.open(id),
        });
        const cardElement = newCard.generateCard();
        cardSection.addItem(cardElement);
      },
    },
    ".cards-container"
  );
  cardSection.renderItems();
};

//Load initial data
document.addEventListener("DOMContentLoaded", () => {
  //render cards and user info
  getInitialData(loadInitialCards);
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
});

//Event Listeners
editButton.addEventListener("click", () => {
  loadEditFormData();
  popupEditForm.open();
});
addButton.addEventListener("click", () => popupAddForm.open());
profileImageContainer.addEventListener("click", () => {
  popupAvatarForm.open();
});
