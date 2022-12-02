let editButton = document.querySelector(".profile__edit-button");
let closeIcon = document.querySelector(".popup__close-icon");
let popup = document.querySelector(".popup");
let nameInput = document.querySelector("#name");
let descriptionInput = document.querySelector("#description");
let formElement = document.querySelector(".form");
let name = document.querySelector(".profile__name");
let description = document.querySelector(".profile__description");
const cardTemplate = document.querySelector("#element-template").content;
const cardsContainer = document.querySelector(".elements");

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

function showPopup() {
  nameInput.value = name.textContent;
  descriptionInput.value = description.textContent;
  popup.classList.add("popup_opened");
}

function hidePopup() {
  popup.classList.remove("popup_opened");
}
const addCard = (card) => {
  const listElement = cardTemplate.cloneNode(true);
  listElement.querySelector(".element__image").src = card.link;
  listElement.querySelector(".element__image").alt = "Imagen de " + card.name;
  listElement.querySelector(".element__title").textContent = card.name;
  cardsContainer.append(listElement);
};

function handleProfileFormSubmit(e) {
  e.preventDefault();
  name.textContent = nameInput.value;
  description.textContent = descriptionInput.value;
  hidePopup();
}
document.addEventListener("DOMContentLoaded", () => {
  initialCards.forEach((card) => {
    addCard(card);
  });
});
editButton.addEventListener("click", showPopup);
closeIcon.addEventListener("click", hidePopup);
formElement.addEventListener("submit", handleProfileFormSubmit);
