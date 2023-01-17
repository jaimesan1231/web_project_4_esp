export default class FormValidator {
  constructor(args, formElement) {
    this._errorSelector = args.errorSelector;
    this._labelSelector = args.labelSelector;
    this._inputSelector = args.inputSelector;
    this._submitButtonSelector = args.submitButtonSelector;
    this._inactiveButtonClass = args.inactiveButtonClass;
    this._inputErrorClass = args.inputErrorClass;
    this._errorClass = args.errorClass;
    this._formElement = formElement;
  }
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  _showInputError = (inputElement, errorMessage) => {
    const inputError = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    inputError.textContent = errorMessage;
    inputError.classList.add(this._errorClass);
  };
  _hideInputError = (inputElement) => {
    const inputError = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    inputError.classList.remove(this._errorClass);
    inputError.textContent = "";
  };
  _toggleButtonSubmit = (inputList, button) => {
    if (this._hasInvalidInput(inputList)) {
      button.classList.add(this._inactiveButtonClass);
    } else {
      button.classList.remove(this._inactiveButtonClass);
    }
  };
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };
  _setEventListeners = () => {
    const inputList = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
    const button = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonSubmit(inputList, button);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonSubmit(inputList, button);
      });
    });
  };
  enableValidation = () => {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
}
