const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');
const editName = document.querySelector('.profile__user-name');
const editJob = document.querySelector('.profile__user-profession');

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
const placeForm = document.querySelector('.popup__container_place');
const profileForm = document.querySelector('.popup__container_profile');
const submBtnPlace = document.querySelector('.popup__submit-btn_place');
const popups = document.querySelectorAll('.popup')

const popupPhoto = document.querySelector('.photo-popup');
const photoPopupImg = document.querySelector('.photo-popup__img');
const photoPopupHeader = document.querySelector('.photo-popup__header');
const closePhotoPopupBtn = document.querySelector('.photo-popup__close-btn');

const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content;

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

function deleteErrors (popup) {
    const errorList = Array.from(popup.querySelectorAll('.popup__input-error'))
    errorList.forEach((elem) => {
        elem.textContent = ''
        elem.classList.remove('popup__input-error_active');
    })
};

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
    document.addEventListener('keydown', closeByEscape);
};

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
    };
};
function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
};

function editProfile () {
    formProfile.querySelector('.popup__submit-btn').classList.remove('popup__submit-btn_inactive');
    formProfile.querySelector('.popup__submit-btn').removeAttribute('disabled');
    deleteErrors(popupProfile);
    openPopup(popupProfile);
    nameInput.value = editName.textContent;
    jobInput.value = editJob.textContent;
};
function handleFormProfileSubmit (evt) {
    evt.preventDefault();
    editName.textContent = nameInput.value;
    editJob.textContent = jobInput.value;
    closePopup(popupProfile);
};

function openPlace() {
    clearPlace();
    openPopup(popupPlace);
    submBtnPlace.classList.add('popup__submit-btn_inactive');
    submBtnPlace.setAttribute('disabled', 'disabled');
};
function handleFormPlaceSubmit (evt) {
    evt.preventDefault();
    closePopup(popupPlace)
    elements.prepend(createCard({name: placeInput.value, link: linkInput.value}));
    formOfPlace.reset();
};
function clearPlace () {
    formOfPlace.reset();
    deleteErrors(popupPlace)
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