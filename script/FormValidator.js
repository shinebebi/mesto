class FormValidator {
    constructor(obj, form) {
        this._formElement = obj.formElement;
        this._inputElement = obj.inputElement;
        this._submitButtonSelector = obj.submitButtonSelector;
        this._inactiveButtonClass = obj.inactiveButtonClass;
        this._inputErrorClass = obj.inputErrorClass;
        this._errorClass = obj.errorClass;
        this._form = form
    }

    enableValidation = () => {
        this._setEventListeners();
    }
    _setEventListeners =() => {
        const inputList = Array.from(this._form.querySelectorAll(this._inputElement));
        this._toggleButtonState()
        inputList.forEach(inputElement => {
            inputElement.addEventListener('input', this._toggleButtonState)
            inputElement.addEventListener('input', function () {
                if (!inputElement.validity.valid) {
                    document.querySelector(`.${inputElement.name}-error`).textContent = inputElement.validationMessage;
                    document.querySelector(`.${inputElement.name}-error`).classList.add('popup__input-error_active');
                } else {
                    document.querySelector(`.${inputElement.name}-error`).classList.remove('popup__input-error_active');
                    document.querySelector(`.${inputElement.name}-error`).textContent = '';
                }
            })
        });
    }
    _toggleButtonState = () => {
        const buttonElement = this._form.querySelector(this._submitButtonSelector);
        if (this._hasInvalidInput()) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.setAttribute('disabled', 'disabled');
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    }

    _hasInvalidInput = () => {
        const inputList = Array.from(this._form.querySelectorAll(this._inputElement));
        return inputList.some(inputElement => {
            return !inputElement.validity.valid;
        });
    }
}
export { FormValidator } ;