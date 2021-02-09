let editBtn = document.querySelector('.profile__edit-btn');
let addBtn = document.querySelector('.profile__add-btn');
let editName = document.querySelector('.profile__user-name');
let editJob = document.querySelector('.profile__user-profession')

const closeBtn_profile = document.querySelector('.popup__close-btn_profile');
const closeBtn_place = document.querySelector('.popup__close-btn_place');
let formElement_profile = document.querySelector('.popup__container_profile');
const formElement_place = document.querySelector('.popup__container_place');
let nameInput = formElement_profile.querySelector('.popup__field_user-name');
const trashBtn = document.querySelector('.element__trash-btn');
let jobInput = formElement_profile.querySelector('.popup__field_user-job');
const placeInput = formElement_place.querySelector('.popup__field_place-name');
const linkInput = formElement_place.querySelector('.popup__field_place-link');
let popupProfile = document.querySelector('.popup_profile');
let popupPlace = document.querySelector('.popup_place');

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
initialCards.forEach(function (elem) {
const initialCards_element = elementTemplate.cloneNode(true);
initialCards_element.querySelector('.element__name').textContent = elem.name;
initialCards_element.querySelector('.element__photo').src = elem.link;
initialCards_element.querySelector('.photo-popup__img').src = elem.link;
initialCards_element.querySelector('.photo-popup__header').textContent = elem.name;
initialCards_element.querySelector('.element__like-btn').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-btn_active');
    });
initialCards_element.querySelector('.element__trash-btn').addEventListener('click', function(evt) {
    evt.target.classList.add('element_delete');
    const delElem = document.querySelector('.element_delete').closest('.element');
    delElem.remove();
})
initialCards_element.querySelector('.element__photo').addEventListener('click', function(evt) {
    const openPhoto = evt.target;
    const photoPopup = openPhoto.closest('.element');
    const openPhoto_popup = photoPopup.querySelector('.photo-popup');
    openPhoto_popup.classList.toggle('popup_opened');
})
initialCards_element.querySelector('.photo-popup__close-btn').addEventListener('click', function(evt) {
    const closeBtn = evt.target;
    const closePopup = closeBtn.closest('.photo-popup')
    closePopup.classList.toggle('popup_opened');
})
elements.append(initialCards_element);
});
function popupOpen_profile() {
    popupProfile.classList.toggle('popup_opened');
}
function popupOpen_place() {
    popupPlace.classList.toggle('popup_opened');
}
function popupClose_place() {
    popupOpen_place()
    placeInput.value = '';
    linkInput.value ='';
}
function editProfile () {
    popupOpen_profile()
    nameInput.value = editName.textContent;
    jobInput.value = editJob.textContent;
}
function handleFormSubmit (evt) {
    evt.preventDefault();
    editName.textContent = nameInput.value;
    editJob.textContent = jobInput.value;
    editProfile()
}
function placeForm (evt) {
    evt.preventDefault();
    popupOpen_place()
    initialCards.unshift({name: placeInput.value, link: linkInput.value});
    const initialCards_element = elementTemplate.cloneNode(true);
    initialCards_element.querySelector('.element__name').textContent = initialCards[0].name;
    initialCards_element.querySelector('.element__photo').src = initialCards[0].link;
    initialCards_element.querySelector('.photo-popup__img').src = initialCards[0].link;
    initialCards_element.querySelector('.photo-popup__header').textContent = initialCards[0].name;
    initialCards_element.querySelector('.element__like-btn').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-btn_active');
        });
    elements.prepend(initialCards_element);
    placeInput.value = '';
    linkInput.value ='';
    document.querySelector('.element__trash-btn').addEventListener('click', function(evt) {
        evt.target.classList.add('element_delete');
        const delElem = document.querySelector('.element_delete').closest('.element');
        delElem.remove();
    })
    document.querySelector('.element__photo').addEventListener('click', function(evt) {
        const openPhoto = evt.target;
        const photoPopup = openPhoto.closest('.element');
        const openPhoto_popup = photoPopup.querySelector('.photo-popup');
        openPhoto_popup.classList.toggle('popup_opened');
    })
    document.querySelector('.photo-popup__close-btn').addEventListener('click', function(evt) {
        const closeBtn = evt.target;
        const closePopup = closeBtn.closest('.photo-popup')
        closePopup.classList.toggle('popup_opened');
    })
};
addBtn.addEventListener('click', popupOpen_place);
editBtn.addEventListener('click', editProfile);
formElement_profile.addEventListener('submit', handleFormSubmit);
formElement_place.addEventListener('submit', placeForm);
closeBtn_profile.addEventListener('click', popupOpen_profile);
closeBtn_place.addEventListener('click', popupClose_place);