let editButton = document.querySelector(".profile__edit-button");
let closeIcon = document.querySelector(".popup__close-icon");
let popup = document.querySelector(".popup");
let nameInput = document.querySelector("#name");
let descriptionInput = document.querySelector("#description");

function showPopup() {
  let name = document.querySelector(".profile__name");
  let description = document.querySelector(".profile__description");
  nameInput.value = name.textContent;
  descriptionInput.value = description.textContent;
  popup.classList.add("popup_opened");
}

function hidePopup() {
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", showPopup);
closeIcon.addEventListener("click", hidePopup);
