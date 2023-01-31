import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmitForm) {
    super(selector);
    this._handleSubmitForm = handleSubmitForm;
  }
  _resetForm() {
    this._element.querySelector(".form").reset();
    this._labelList = this._element.querySelectorAll(".form__label");
    this._labelList.forEach((label) => {
      const input = label.querySelector(".form__input");
      const error = label.querySelector(".form__input-error");
      input.classList.remove("form__input_type_error");
      error.classList.remove("form__input-error_visible");
    });
    this._element
      .querySelector(".form__button")
      .classList.add("form__button_disabled");
  }
  _getInputValues() {
    this._inputList = this._element.querySelectorAll(".form__input");
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.id] = input.value;
    });
    return this._inputValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener("submit", () => {
      this._handleSubmitForm(this._getInputValues());
      this.close();
    });
  }
  close() {
    super.close();
    this._resetForm();
  }
}
