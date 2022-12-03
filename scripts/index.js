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

function showEditPopup() {
  nameInput.value = name.textContent;
  descriptionInput.value = description.textContent;
  editPopup.classList.add("popup_opened");
}
function showAddPopup() {
  addPopup.classList.add("popup_opened");
}

function hidePopup(e) {
  const poupContainer = e.target.closest(".popup");
  poupContainer.classList.remove("popup_opened");
}
const addCard = (card) => {
  const listElement = cardTemplate.cloneNode(true);
  listElement.querySelector(".element__image").src = card.link;
  listElement.querySelector(".element__image").alt = "Imagen de " + card.name;
  listElement.querySelector(".element__title").textContent = card.name;
  listElement.querySelector(".element__title");
  listElement
    .querySelector(".element__like-icon")
    .addEventListener("click", handleLikeButton);
  listElement
    .querySelector(".element__delete-icon")
    .addEventListener("click", handleDeleteButton);
  cardsContainer.prepend(listElement);
};
function handleLikeButton(e) {
  e.target.classList.toggle("element__like-icon_active");
}
function handleDeleteButton(e) {
  e.target.closest(".element").remove();
}
function handleEditFormSubmit(e) {
  e.preventDefault();
  name.textContent = nameInput.value;
  description.textContent = descriptionInput.value;
  hidePopup(e);
}
function handleAddFormSubmit(e) {
  e.preventDefault();
  const titleInput = document.querySelector("#title");
  const linkInput = document.querySelector("#link");
  addCard({ name: titleInput.value, link: linkInput.value });
  titleInput.value = "";
  linkInput.value = "";
  hidePopup(e);
}
document.addEventListener("DOMContentLoaded", () => {
  initialCards.forEach((card) => {
    addCard(card);
  });
});
editButton.addEventListener("click", showEditPopup);
editForm.addEventListener("submit", handleEditFormSubmit);
addForm.addEventListener("submit", handleAddFormSubmit);
Array.from(closeIcon).forEach((button) => {
  button.addEventListener("click", hidePopup);
});
addButton.addEventListener("click", showAddPopup);
