const submitProfileForm = () => {
  document.querySelector('.popup__container_profile').addEventListener('submit', function (evt) {
    evt.preventDefault();
    const popupProfile = document.querySelector('.popup_profile');
    const editName = document.querySelector('.profile__user-name');
    const editJob = document.querySelector('.profile__user-profession');
    const nameInput = formProfile.querySelector('.popup__field_user-name');
    const jobInput = formProfile.querySelector('.popup__field_user-job');
    editName.textContent = nameInput.value;
    editJob.textContent = jobInput.value;
    popupProfile.classList.remove('popup_opened');
  });
}
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  //inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  };
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
  const buttonElement = formElement.querySelector('.popup__submit-btn');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup'));
  formList.forEach((formElement) => {
    submitProfileForm()
    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__container'));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    });
  });
};
const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit-btn_inactive');
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove('popup__submit-btn_inactive');
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