const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');
const editName = document.querySelector('.profile__user-name');
const editJob = document.querySelector('.profile__user-profession');
const page = document.querySelector('.page');

const closingProfile = document.querySelector('.popup__close-btn_profile');
const closingPlace = document.querySelector('.popup__close-btn_place');
const formProfile = document.querySelector('.popup__container_profile');
const formPlace = document.querySelector('.popup__container_place');
const nameInput = formProfile.querySelector('.popup__field_user-name');
const jobInput = formProfile.querySelector('.popup__field_user-job');
const placeInput = formPlace.querySelector('.popup__field_place-name');
const linkInput = formPlace.querySelector('.popup__field_place-link');
const popupProfile = document.querySelector('.popup_profile');
const popupPlace = document.querySelector('.popup_place');

const popupPhoto = document.querySelector('.photo-popup');
const photoPopupImg = document.querySelector('.photo-popup__img');
const photoPopupHeader = document.querySelector('.photo-popup__header');
const closePhotoPopupBtn = document.querySelector('.photo-popup__close-btn');

const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content;

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

function createCard (elem) {
    const newCard = elementTemplate.cloneNode(true);
    const elementPhoto = newCard.querySelector('.element__photo');
    newCard.querySelector('.element__name').textContent = elem.name;
    elementPhoto.src = elem.link;
    elementPhoto.alt = elem.name;
    newCard.querySelector('.element__like-btn').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-btn_active');
    });
    newCard.querySelector('.element__trash-btn').addEventListener('click', function(evt) {
        evt.target.closest('.element').remove();
    });
    elementPhoto.addEventListener('click', function() {
        photoPopupImg.src = elem.link;
        photoPopupHeader.textContent = elem.name;
        photoPopupImg.alt = elem.name;
        openPopup(popupPhoto);
    });
    return newCard;
};

initialCards.forEach(elem => {
    elements.append(createCard(elem));
});
function clearProfile () {
    const errorList = Array.from(document.querySelectorAll('span'))
    errorList.forEach((elem) => {
        elem.textContent = ''
        elem.classList.remove('popup__input-error_active');
    })
    document.querySelector('.popup__submit-btn').classList.remove('popup__submit-btn_inactive');
    document.querySelector('.popup__submit-btn').removeAttribute('disabled');
}
function clearPlace () {
    placeInput.value = '';
    linkInput.value ='';
    const errorList = Array.from(document.querySelectorAll('span'))
    errorList.forEach((elem) => {
        elem.textContent = ''
        elem.classList.remove('popup__input-error_active');
    })
    document.querySelector('.popup__submit-btn').classList.remove('popup__submit-btn_inactive');
    document.querySelector('.popup__submit-btn').removeAttribute('disabled');
}
function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
};
function keyHandlerPhoto(evt) {
    if (evt.key === "Escape") {
        closePopup(popupPhoto);
    }
  }
function keyHandlerPlace(evt) {
    if (evt.key === "Escape") {
        closePopup(popupPlace);
        clearPlace();
    }
}
function keyHandlerProfile(evt) {
    if (evt.key === "Escape") {
        closePopup(popupProfile);
        clearProfile();
    }
}
function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
};

function editProfile () {
    openPopup(popupProfile)
    nameInput.value = editName.textContent;
    jobInput.value = editJob.textContent;
};
function handleFormProfileSubmit (evt) {
    evt.preventDefault();
    editName.textContent = nameInput.value;
    editJob.textContent = jobInput.value;
    closePopup(popupProfile);
};
function closeProfile() {
    closePopup(popupProfile);
    clearProfile();
};

function openPlace() {
    openPopup(popupPlace);
};
function handleFormPlaceSubmit (evt) {
    evt.preventDefault();
    closePopup(popupPlace)
    elements.prepend(createCard({name: placeInput.value, link: linkInput.value}));
    placeInput.value = '';
    linkInput.value ='';
};
function closePlace() {
    closePopup(popupPlace)
    clearPlace();
};


addBtn.addEventListener('click', openPlace);
editBtn.addEventListener('click', editProfile);
formProfile.addEventListener('submit', handleFormProfileSubmit);
formPlace.addEventListener('submit', handleFormPlaceSubmit);
closingProfile.addEventListener('click', closeProfile);
closingPlace.addEventListener('click', closePlace);
page.addEventListener('keydown', keyHandlerPhoto);
closePhotoPopupBtn.addEventListener('click', function () {
    closePopup(popupPhoto);
});
page.addEventListener('keydown', keyHandlerPlace);
page.addEventListener('keydown', keyHandlerProfile);
popupPhoto.addEventListener('click', function(evt) {
    closePopup(evt.target);
})
popupPlace.addEventListener('click', function(evt) {
    closePlace(evt.target);
})
popupProfile.addEventListener('click', function(evt) {
    closeProfile(evt.target);
})