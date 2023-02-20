import api from "../components/Api.js";
import Card from "../components/Card.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import previewPopup from "../components/PopupWithImage.js";
import userInfo from "../components/UserInfo.js";
import {
  cardsContainer,
  jobInput,
  nameInput,
  profileImage,
} from "./constants.js";

//load Edit form
export const loadEditFormData = () => {
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
};

//API functions

//GET user info and cards
export const getInitialData = (loadInitialCards) => {
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

//Edit user profile
export const editProfileInfo = (button, inputValues, popup) => {
  button.textContent = "Guardando ...";
  api
    .editProfile(inputValues)
    .then((res) => {
      if (res.ok) {
        userInfo.setUserInfo(inputValues);
        button.textContent = "Guardar";
        popup.close();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
    .catch((err) => console.log(err));
};

//Edit user avatar
export const editProfileAvatar = (button, link, popup) => {
  button.textContent = "Guardando ...";
  api
    .editAvatar(link)
    .then((res) => {
      if (res.ok) {
        profileImage.src = link;
        button.textContent = "Guardar";
        popup.close();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
    .catch((err) => console.log(err));
};

//POST card
export const postCard = (button, inputValues, popup) => {
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
          if (data.likes.find((item) => item._id == userInfo.getUserId())) {
            const likeIcon = cardElement.querySelector(".card__like-icon");
            likeIcon.classList.add("card__like-icon_active");
          }
        },
        handleDeleteButton: (id) => {
          deletePopup.open(id);
        },
      });
      const cardElement = newCard.generateCard();
      cardsContainer.prepend(cardElement);
      button.textContent = "Crear";
      popup.close();
    })
    .catch((err) => console.log(err));
};

//DELETE Card
export const deleteCard = (e, popup) => {
  const button = e.target;
  const cardId = e.target.dataset.id;
  button.textContent = "Eliminando ...";
  api
    .deleteCard(cardId)
    .then((res) => {
      if (res.ok) {
        button.textContent = "Sí";
        document.querySelector(`li[data-id="${cardId}"]`).remove();
        popup.close();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
    .catch((err) => console.log(err));
};

//PUT like
export const putLike = (e, id) => {
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
      e.target.classList.add("card__like-icon_active");
      likesNumber.textContent = data.likes.length;
      likesNumber.classList.add("card__like-number_visible");
    })
    .catch((err) => console.log(err));
};

//DELETE like
export const removeLike = (e, id) => {
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
export const deletePopup = new PopupWithConfirmation("#delete-popup", (e) => {
  deleteCard(e, deletePopup);
});
deletePopup.setEventListeners();
