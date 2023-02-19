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
  profileImage,
  profileImageContainer,
} from "../scripts/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import previewPopup from "../components/PopupWithImage.js";
import userInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api";
import PopupWithConfirmation from "../components/PopupWithConfirmation";

//Config api
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_es_cohort_04",
  headers: {
    authorization: "64b42335-e161-40b8-8c1c-d5789010cc5e",
    "content-type": "application/json",
  },
});
profileImageContainer.addEventListener("click", () => {
  popupAvatarForm.open();
});

//User info
const getInitialData = () => {
  return api
    .getUserInfo()
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error:${res.status}`);
      }
    })
    .then((data) => {
      userInfo.setUserInfo({ name: data.name, job: data.about, id: data._id });
      profileImage.src = data.avatar;
      loadInitialCards();
    })
    .catch((err) => console.log(err));
};

const loadEditFormData = () => {
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
};

const editProfileInfo = (button, inputValues) => {
  button.textContent = "Guardando ...";
  api
    .editProfile(inputValues)
    .then((res) => {
      if (res.ok) {
        userInfo.setUserInfo(inputValues);
        button.textContent = "Guardar";
        popupEditForm.close();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
    .catch((err) => console.log(err));
};

const editProfileAvatar = (button, link) => {
  button.textContent = "Guardando ...";
  api
    .editAvatar(link)
    .then((res) => {
      if (res.ok) {
        profileImage.src = link;
        button.textContent = "Guardar";
        popupAvatarForm.close();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
    .catch((err) => console.log(err));
};

const postCard = (button, inputValues) => {
  button.textContent = "Creando ...";
  api
    .postCard(inputValues)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
    .then((data) => {
      console.log(data);
      const newCard = new Card({
        data,
        handleCardClick: (e) => {
          previewPopup.setEventListeners();
          previewPopup.open({
            link: e.target.src,
            title: e.target.alt.substring(10),
          });
        },
        handleLikeClick: (e) => {
          if (e.target.classList.contains("card__like-icon_active")) {
            removeLike(e, data._id);
          } else {
            putLike(e, data._id);
          }
        },
        checkLikeActive: (cardElement) => {
          console.log("check esto");
          if (data.likes.find((item) => item._id == userInfo.getUserId())) {
            console.log("Ya estaba likeada la foto con id: " + item._id);
            const likeIcon = cardElement.querySelector(".card__like-icon");
            likeIcon.classList.add("card__like-icon_active");
          }
        },
        handleDeleteButton: (id) => {
          deletePopup.open(id);
          console.log("click aquiiii");
        },
      });
      const cardElement = newCard.generateCard();
      cardsContainer.append(cardElement);
      button.textContent = "Crear";
      popupAddForm.close();
    })
    .catch((err) => console.log(err));
};

const deleteCard = (e) => {
  console.log(e.target);
  const button = e.target;
  const cardId = e.target.dataset.id;
  button.textContent = "Eliminando ...";
  api
    .deleteCard(cardId)
    .then((res) => {
      if (res.ok) {
        button.textContent = "Sí";

        document.querySelector(`li[data-id="${cardId}"]`).remove();
        deletePopup.close();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
    .catch((err) => console.log(err));
  console.log(e.target.dataset.id);
  console.log("se elimino algo");
};

const putLike = (e, id) => {
  const likesNumber =
    e.target.parentElement.querySelector(".card__like-number");
  api
    .putLike(id)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
    .then((data) => {
      console.log(data);
      e.target.classList.add("card__like-icon_active");
      likesNumber.textContent = data.likes.length;
      likesNumber.classList.add("card__like-number_visible");
    })
    .catch((err) => console.log(err));
};
const removeLike = (e, id) => {
  const likesNumber =
    e.target.parentElement.querySelector(".card__like-number");
  api
    .removeLike(id)
    .then((res) => {
      if (res.ok) {
        likesNumber.textContent--;
        e.target.classList.remove("card__like-icon_active");
        if (likesNumber.textContent == 0) {
          likesNumber.classList.remove("card__like-number_visible");
        }
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
    .catch((err) => console.log(err));
};
//Delete Popup
const deletePopup = new PopupWithConfirmation("#delete-popup", (e) => {
  deleteCard(e);
});
deletePopup.setEventListeners();
//Avatar Popup
const popupAvatarForm = new PopupWithForm(
  "#avatar-popup",
  (button, inputValue) => {
    const { avatar } = inputValue;
    editProfileAvatar(button, avatar);
  }
);
popupAvatarForm.setEventListeners();

//Add Popup
const popupAddForm = new PopupWithForm("#add-popup", (button, inputValues) => {
  postCard(button, inputValues);
});
popupAddForm.setEventListeners();

//Edit Popup

const popupEditForm = new PopupWithForm(
  "#edit-popup",
  (button, inputValues) => {
    editProfileInfo(button, inputValues);
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
      console.log(data);
      console.log("datos");
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
                .classList.remove(".card__delete-icon_visible");
            }
            console.log("aqui prueba");
            console.log(item.likes);
            console.log(userId);
            if (item.likes.find((item) => item._id == userId)) {
              console.log(item._id);
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
  getInitialData();
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
});

//Event Listeners
editButton.addEventListener("click", () => {
  loadEditFormData();
  popupEditForm.open();
});
addButton.addEventListener("click", () => popupAddForm.open());
