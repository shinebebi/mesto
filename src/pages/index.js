import '../pages/index.css';
import Card from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js"
import Section from "../components/Section.js"
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithUpdateAvatar from "../components/PopupWithUpdateAvatar.js";
import Api from "../components/Api.js";


const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');
const avatarBtn = document.querySelector('.profile__avatar-btn');
const formAvatar = document.querySelector('.popup__container_update-avatar')
const avatarUrlInput = document.querySelector('.popup__field_avatar-url')
const popupAvatar = document.querySelector('.popup_update-avatar')
const formProfile = document.querySelector('.popup__container_profile');
const formPlace = document.querySelector('.popup__container_place');
const nameInput = formProfile.querySelector('.popup__field_user-name');
const jobInput = formProfile.querySelector('.popup__field_user-job');
const popupProfile = document.querySelector('.popup_profile');
const popupPlace = document.querySelector('.popup_place');
const popupPhoto = document.querySelector('.photo-popup');
const elements = document.querySelector('.elements');
const userName = document.querySelector('.profile__user-name');
const userJob = document.querySelector('.profile__user-profession');
const userAvatar = document.querySelector('.profile__avatar');

const validationConfig = {
    inputElement: '.popup__field',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_inactive',
    errorClass: 'popup__input-error_active'
};
const api = new Api({
    userInfoUrl: 'https://mesto.nomoreparties.co/v1/cohort-24/users/me',
    cardsUrl: 'https://mesto.nomoreparties.co/v1/cohort-24/cards',
    avatarUrl: 'https://mesto.nomoreparties.co/v1/cohort-24/users/me/avatar',
    headers: {
        authorization: '9228721e-70d8-4ca7-93f1-0cae3a5cafe4',
    }
});

api.getUserInfo().then(userData => {
    userName.textContent = userData.name;
    userJob.textContent = userData.about;
    userAvatar.src = userData.avatar;
})

const getInitCards = api.getInitialCards()
const profileValidator = new FormValidator(validationConfig, formProfile);
profileValidator.enableValidation()
const placeValidator = new FormValidator(validationConfig, formPlace);
placeValidator.enableValidation()
const avatarValidator = new FormValidator(validationConfig, formAvatar)
avatarValidator.enableValidation()
const popupWithImg = new PopupWithImage(popupPhoto)
const userInfo = new UserInfo({
    userName: '.profile__user-name',
    userProf: '.profile__user-profession'
})
const avatarInfo = new PopupWithUpdateAvatar({
    userAvatar: '.profile__avatar'
})
getInitCards.then(data => {
    const defaultCardList = new Section({
        items: data,
        renderer: (item) => {
            const card = new Card({
                data: item,
                handleCardClick: () => {
                    popupWithImg.open(item)
                    popupWithImg.setEventListeners()
                }
            }, '.element-template');
            const cardElement = card.generateCard()
            defaultCardList.addItem(cardElement)
        }
    }, elements)
    defaultCardList.renderItems()
})
const formOfProfile = new PopupWithForm({
    popupSelector: popupProfile,
    handleFormSubmit: (obj) => {
        userInfo.setUserInfo(obj)
        formOfProfile.close();
        api.editProfile()
        profileValidator.resetValidation()
        api.editProfile().finally(() => {formOfProfile.renderLoading(false)})
    }
})
const formOfPlace = new PopupWithForm({
    popupSelector: popupPlace,
    handleFormSubmit: (obj) => {
        api.addCard(obj).then(cardInfo => {
            const addedCard = new Card({
                data: cardInfo,
                handleCardClick: () => {
                    popupWithImg.open(cardInfo)
                    popupWithImg.setEventListeners()
                }
            }, '.element-template')
            elements.prepend(addedCard.generateCard());
        })
        api.editProfile().finally(() => {formOfPlace.renderLoading(false)})
    }
})

const formOfAvatar = new PopupWithForm({
    popupSelector: popupAvatar,
    handleFormSubmit: (obj) => {
        avatarInfo.setAvatarInfo(obj)
        formOfAvatar.close()
        api.avatarUpdate()
        avatarValidator.resetValidation()
        api.editProfile().finally(() => {formOfAvatar.renderLoading(false)})
    }
})
function editProfile() {
    const userData = userInfo.getUserInfo()
    nameInput.value = userData.userName;
    jobInput.value = userData.userProf;
    formOfProfile.open();
    profileValidator.resetValidation()
};

function openPlace() {
    placeValidator.resetValidation()
    formOfPlace.open()
};

function updateAvatar() {
    const avatarData = avatarInfo.getAvatarInfo()
    avatarUrlInput.value = avatarData.userAvatar;
    formOfAvatar.open()
    avatarValidator.resetValidation()
}

addBtn.addEventListener('click', openPlace);
editBtn.addEventListener('click', editProfile);
avatarBtn.addEventListener('click', updateAvatar)

formOfPlace.setEventListeners()
formOfProfile.setEventListeners()
formOfAvatar.setEventListeners()