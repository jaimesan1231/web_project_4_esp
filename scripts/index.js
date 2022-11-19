let editButton = document.querySelector(".profile__edit-button");
let closeIcon = document.querySelector(".popup__close-icon");
let popup = document.querySelector(".popup");
let nameInput = document.querySelector("#name");
let descriptionInput = document.querySelector("#description");
let formElement = document.querySelector(".form");
let name = document.querySelector(".profile__name");
let description = document.querySelector(".profile__description");

function showPopup() {
  nameInput.value = name.textContent;
  descriptionInput.value = description.textContent;
  popup.classList.add("popup_opened");
}

function hidePopup() {
  popup.classList.remove("popup_opened");
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  name.textContent = nameInput.value;
  description.textContent = descriptionInput.value;
  hidePopup();
}

editButton.addEventListener("click", showPopup);
closeIcon.addEventListener("click", hidePopup);
formElement.addEventListener("submit", handleProfileFormSubmit);
