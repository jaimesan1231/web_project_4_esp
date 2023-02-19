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
  cardLikes,
} from "../scripts/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import previewPopup from "../components/PopupWithImage.js";
import userInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api";

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
api
  .getUserInfo()
  .then((response) => response.json())
  .then((data) => {
    userInfo.setUserInfo({ name: data.name, job: data.about, id: data._id });
    profileImage.src = data.avatar;
    console.log(data);
  });

const loadEditFormData = () => {
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
};

const editProfileInfo = (inputValues) => {
  api
    .editProfile(inputValues)
    .then((res) => {
      if (res.ok) {
        userInfo.setUserInfo(inputValues);
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
    .catch((err) => console.log(err));
};

const editProfileAvatar = (link) => {
  api
    .editAvatar(link)
    .then((res) => {
      if (res.ok) {
        profileImage.src = link;
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
    .catch((err) => console.log(err));
};

const postCard = (inputValues) => {
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
      const newCard = new Card(
        data,
        (e) => {
          previewPopup.setEventListeners();
          previewPopup.open({
            link: e.target.src,
            title: e.target.alt.substring(10),
          });
        },
        (e) => {
          console.log(
            e.target.parentElement.querySelector(".card__like-number")
          );
          const likesNumber =
            e.target.parentElement.querySelector(".card__like-number");
          if (e.target.classList.contains("card__like-icon_active")) {
            removeLike(data._id);
            api
              .removeLike(data._id)
              .then((res) => {
                if (res.ok) {
                  likesNumber.textContent--;
                  e.target.classList.remove("card__like-icon_active");
                  if (likesNumber.textContent == 0) {
                    console.log("aea");
                    likesNumber.classList.remove("card__like-number_visible");
                  }
                } else {
                  return Promise.reject(`Error: ${res.status}`);
                }
              })

              .catch((err) => console.log(err));
          } else {
            putLike(data._id);
            api
              .putLike(data._id)
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
          }
        }
      );
      const cardElement = newCard.generateCard();
      cardsContainer.prepend(cardElement);
    })
    .catch((err) => console.log(err));
};

const putLike = (id) => {
  // api.putLike(id);
  console.log(id);
};
const removeLike = (id) => {
  console.log(id);
};
//Avatar Popup
const popupAvatarForm = new PopupWithForm("#avatar-popup", (inputValue) => {
  const { avatar } = inputValue;
  editProfileAvatar(avatar);
});
popupAvatarForm.setEventListeners();

//Add Popup
const popupAddForm = new PopupWithForm("#add-popup", (inputValues) => {
  postCard(inputValues);
});
popupAddForm.setEventListeners();

//Edit Popup

const popupEditForm = new PopupWithForm("#edit-popup", (inputValues) => {
  editProfileInfo(inputValues);
});
popupEditForm.setEventListeners();

//Section
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

const renderInitialCards = (initialCards) => {
  console.log(initialCards);
  const cardSection = new Section(
    {
      items: initialCards,
      renderer: (item) => {
        const newCard = new Card(
          item,
          (e) => {
            previewPopup.setEventListeners();
            previewPopup.open({
              link: e.target.src,
              title: e.target.alt.substring(10),
            });
          },
          (e) => {
            console.log(
              e.target.parentElement.querySelector(".card__like-number")
            );
            const likesNumber =
              e.target.parentElement.querySelector(".card__like-number");
            if (e.target.classList.contains("card__like-icon_active")) {
              removeLike(item._id);
              api
                .removeLike(item._id)
                .then((res) => {
                  if (res.ok) {
                    likesNumber.textContent--;
                    e.target.classList.remove("card__like-icon_active");
                    if (likesNumber.textContent == 0) {
                      console.log("aea");
                      likesNumber.classList.remove("card__like-number_visible");
                    }
                  } else {
                    return Promise.reject(`Error: ${res.status}`);
                  }
                })

                .catch((err) => console.log(err));
            } else {
              putLike(item._id);
              api
                .putLike(item._id)
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
            }
          },
          (cardElement) => {
            if (item.likes.find((item) => item._id == userInfo.getUserId())) {
              const likeIcon = cardElement.querySelector(".card__like-icon");
              likeIcon.classList.add("card__like-icon_active");
            }
          }
        );
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
