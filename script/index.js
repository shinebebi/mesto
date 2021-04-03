const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');
const editName = document.querySelector('.profile__user-name');
const editJob = document.querySelector('.profile__user-profession');

const formProfile = document.querySelector('.popup__container_profile');
const formPlace = document.querySelector('.popup__container_place');
const nameInput = formProfile.querySelector('.popup__field_user-name');
const jobInput = formProfile.querySelector('.popup__field_user-job');
const placeInput = formPlace.querySelector('.popup__field_place-name');
const linkInput = formPlace.querySelector('.popup__field_place-link');
const popupProfile = document.querySelector('.popup_profile');
const popupPlace = document.querySelector('.popup_place');
const popups = document.querySelectorAll('.popup')

const popupPhoto = document.querySelector('.photo-popup');
const photoPopupImg = document.querySelector('.photo-popup__img');
const photoPopupHeader = document.querySelector('.photo-popup__header');

const elements = document.querySelector('.elements');

const object = {
    formElement: '.popup__container',
    inputElement: '.popup__field',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};
const formOfPlace = document.forms.placeinfo;

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js"

const profileValidator = new FormValidator(object, formProfile);
profileValidator.enableValidation()

const placeValidator = new FormValidator(object, formPlace);
placeValidator.enableValidation()

function createCard(elem) {
    const card = new Card(elem, '.element-template', handleCardClick);
    return card.generateCard();
}

initialCards.forEach(elem => {
    elements.append(createCard(elem));
})

function handleCardClick(name, link) {
    photoPopupImg.src = link;
    photoPopupHeader.textContent = name;
    photoPopupImg.alt = name;
    openPopup(popupPhoto)
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
    document.addEventListener('keydown', closeByEscape);
};

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
    ;
};

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
};

function editProfile() {
    openPopup(popupProfile);
    nameInput.value = editName.textContent;
    jobInput.value = editJob.textContent;
    profileValidator.resetValidation()
};

function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    editName.textContent = nameInput.value;
    editJob.textContent = jobInput.value;
    closePopup(popupProfile);
};

function openPlace() {
    placeValidator.resetValidation()
    formOfPlace.reset();
    openPopup(popupPlace);
};

function handleFormPlaceSubmit(evt) {
    evt.preventDefault();
    closePopup(popupPlace)
    elements.prepend(createCard({name: placeInput.value, link: linkInput.value}));
    formOfPlace.reset();
};

addBtn.addEventListener('click', openPlace);
editBtn.addEventListener('click', editProfile);
formProfile.addEventListener('submit', handleFormProfileSubmit);
formPlace.addEventListener('submit', handleFormPlaceSubmit);
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-btn')) {
            closePopup(popup)
        }
    });
});