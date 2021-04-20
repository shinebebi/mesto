const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');
const editName = document.querySelector('.profile__user-name');
const editJob = document.querySelector('.profile__user-profession');

const formProfile = document.querySelector('.popup__container_profile');
const formPlace = document.querySelector('.popup__container_place');
const nameInput = formProfile.querySelector('.popup__field_user-name');
const jobInput = formProfile.querySelector('.popup__field_user-job');
const popupProfile = document.querySelector('.popup_profile');
const popupPlace = document.querySelector('.popup_place');

const popupPhoto = document.querySelector('.photo-popup');

const elements = document.querySelector('.elements');

const object = {
    formElement: '.popup__container',
    inputElement: '.popup__field',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

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

import {Card} from "./components/Card.js";
import {FormValidator} from "./components/FormValidator.js"
import Section from "./components/Section.js"
import PopupWithImage from "./components/PopupWithImage.js"
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";


const profileValidator = new FormValidator(object, formProfile);
profileValidator.enableValidation()

const placeValidator = new FormValidator(object, formPlace);
placeValidator.enableValidation()

const defaultCardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card({
            data: item,
            handleCardClick: () => {
                const popupWithImg = new PopupWithImage(popupPhoto)
                popupWithImg.open(item)
                popupWithImg.setEventListeners()
            }
        }, '.element-template');
        const cardElement = card.generateCard()
        defaultCardList.addItem(cardElement)
    }
}, elements)
defaultCardList.renderItems()

const formOfProfile = new PopupWithForm({
    popupSelector: popupProfile,
    handleFormSubmit: (obj) => {
        const userInfo = new UserInfo({
            userName: editName,
            userProf: editJob
        })
        userInfo.setUserInfo(obj)
        formOfProfile.close();
        profileValidator.resetValidation()
    }
})
formOfProfile.setEventListeners()

const formOfPlace = new PopupWithForm({
    popupSelector: popupPlace,
    handleFormSubmit: (obj) => {
        const addedCard = new Card({
            data: obj,
            handleCardClick: () => {
                const addedPopupWithImg = new PopupWithImage(popupPhoto)
                addedPopupWithImg.open(obj)
                addedPopupWithImg.setEventListeners()
            }
        }, '.element-template')
        elements.prepend(addedCard.generateCard());
    }
})
formOfPlace.setEventListeners()

function editProfile() {
    const newUserData = new UserInfo({
        userName: editName,
        userProf: editJob
    })
    const userInfo = newUserData.getUserInfo()
    nameInput.value = userInfo.userName;
    jobInput.value = userInfo.userProf;
    formOfProfile.open();
    profileValidator.resetValidation()
};

function openPlace() {
    placeValidator.resetValidation()
    formOfPlace.open()
};

addBtn.addEventListener('click', openPlace);
editBtn.addEventListener('click', editProfile);