//данный класс был автоматически переформатирован бабель-конфигуратором, иначе webpack бы не собрался

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FormValidator {
    constructor(obj, form) {
        _defineProperty(this, "_showInputError", inputElement => {
            const errorElement = this._form.querySelector(`.${inputElement.name}-error`);

            errorElement.textContent = inputElement.validationMessage;
            errorElement.classList.add(this._errorClass);
        });

        _defineProperty(this, "_hideInputError", inputElement => {
            const errorElement = this._form.querySelector(`.${inputElement.name}-error`);

            errorElement.textContent = '';
            errorElement.classList.remove(this._errorClass);
        });

        _defineProperty(this, "_checkInputValidity", () => {
            this._inputList.forEach(inputElement => {
                if (!inputElement.validity.valid) {
                    this._showInputError(inputElement);
                } else {
                    this._hideInputError(inputElement);
                }
            });
        });

        _defineProperty(this, "_hasInvalidInput", () => {
            return this._inputList.some(inputElement => {
                return !inputElement.validity.valid;
            });
        });

        _defineProperty(this, "_toggleButtonState", () => {
            if (this._hasInvalidInput()) {
                this._submitButton.classList.add(this._inactiveButtonClass);

                this._submitButton.setAttribute('disabled', 'disabled');
            } else {
                this._submitButton.classList.remove(this._inactiveButtonClass);

                this._submitButton.removeAttribute('disabled');
            }
        });

        _defineProperty(this, "_setEventListeners", () => {
            this._toggleButtonState();

            this._inputList.forEach(inputElement => {
                inputElement.addEventListener('input', this._checkInputValidity);
                inputElement.addEventListener('input', this._toggleButtonState);
            });
        });

        _defineProperty(this, "resetValidation", () => {
            this._inputList.forEach(inputElement => {
                this._hideInputError(inputElement);
            });

            this._toggleButtonState();
        });

        _defineProperty(this, "enableValidation", () => {
            this._setEventListeners();
        });

        this._inputElement = obj.inputElement;
        this._submitButtonSelector = obj.submitButtonSelector;
        this._inactiveButtonClass = obj.inactiveButtonClass;
        this._errorClass = obj.errorClass;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._inputElement));
        this._submitButton = this._form.querySelector(this._submitButtonSelector);
    }

}
export {FormValidator}