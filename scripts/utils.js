import {
  addButton,
  addPopup,
  closeIcon,
  description,
  descriptionInput,
  editButton,
  editPopup,
  name,
  nameInput,
  popupList,
} from "./constants.js";

export const loadEditFormData = () => {
  nameInput.value = name.textContent;
  descriptionInput.value = description.textContent;
};

const showEditPopup = () => {
  loadEditFormData();
  openPopup(editPopup);
};

const handleExitPopupClick = (e) => {
  if (e.target.classList.contains("popup")) {
    hidePopup(e);
  }
};
const handleExitPopupKey = (e) => {
  if (e.key === "Escape") {
    hidePopup(e);
  }
};
const openPopup = (popup) => {
  document.addEventListener("keydown", handleExitPopupKey);
  popup.classList.add("popup_opened");
};
export const hidePopup = () => {
  const poupContainer = document.querySelector(".popup_opened");
  document.removeEventListener("keydown", handleExitPopupKey);
  poupContainer.classList.remove("popup_opened");
  const form = poupContainer.querySelector(".form");
  if (form) {
    form.reset();
    const labelList = form.querySelectorAll(".form__label");
    labelList.forEach((labelElement) => {
      const input = labelElement.querySelector(".form__input");
      const error = labelElement.querySelector(".form__input-error");
      input.classList.remove("form__input_type_error");
      error.classList.remove("form__input-error_visible");
    });
    const button = form.querySelector(".form__button");
    button.classList.add("form__button_disabled");
  }
};
editButton.addEventListener("click", showEditPopup);
addButton.addEventListener("click", () => openPopup(addPopup));
closeIcon.forEach((button) => {
  button.addEventListener("click", hidePopup);
});
popupList.forEach((popupElement) => {
  popupElement.addEventListener("click", handleExitPopupClick);
});
