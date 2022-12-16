const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) => {
  const inputError = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  inputError.textContent = errorMessage;
  inputError.classList.add(errorClass);
};
const hideInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const inputError = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  inputError.classList.remove(errorClass);
  inputError.textContent = "";
};
const toggleButtonSubmit = (inputList, button, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(inactiveButtonClass);
  } else {
    button.classList.remove(inactiveButtonClass);
  }
};

const checkInputValidity = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const setEventListeners = (formElement, args) => {
  const {
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
  } = args;
  const inputList = formElement.querySelectorAll(inputSelector);
  const button = formElement.querySelector(submitButtonSelector);
  toggleButtonSubmit(inputList, button, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass
      );
      toggleButtonSubmit(inputList, button, inactiveButtonClass);
    });
  });
};

const enableValidation = (args) => {
  const { formSelector } = args;
  const formList = document.querySelectorAll(formSelector);
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, args);
  });
};
document.addEventListener("DOMContentLoaded", () => {
  enableValidation({
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_visible",
  });
});

export const resetValidation = (form, args) => {
  const {
    errorSelector,
    labelSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
  } = args;
  const labelList = form.querySelectorAll(labelSelector);
  labelList.forEach((labelElement) => {
    const input = labelElement.querySelector(inputSelector);
    const error = labelElement.querySelector(errorSelector);
    input.classList.remove(inputErrorClass);
    error.classList.remove(errorClass);
  });
  const button = form.querySelector(submitButtonSelector);
  button.classList.add(inactiveButtonClass);
};
