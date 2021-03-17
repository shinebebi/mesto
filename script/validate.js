const showInputError = (formElement, inputElement, errorMessage, error) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(error);
};

const hideInputError = (formElement, inputElement, error) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  errorElement.classList.remove(error);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, error) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, error);
  } else {
    hideInputError(formElement, inputElement, error);
  };
};

const setEventListeners = (formElement, input, submitBtn, inactiveSubm, error) => {
  const inputList = Array.from(formElement.querySelectorAll(input));
  const buttonElement = formElement.querySelector(submitBtn);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, error);
      toggleButtonState(inputList, buttonElement, inactiveSubm);
    });
  });
};
const enableValidation = (obj) => {
    const fieldsetList = Array.from(document.querySelectorAll(obj.formElement));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet, obj.inputElement, obj.submitButtonSelector, obj.inactiveButtonClass, obj.errorClass);
    });
};
const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};
const toggleButtonState = (inputList, buttonElement, inactiveSubm) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveSubm);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(inactiveSubm);
    buttonElement.removeAttribute('disabled');
  } 
};
enableValidation({
  formElement: '.popup__container',
  inputElement: '.popup__field',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}); 