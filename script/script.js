let editBtn = document.querySelector('.profile__edit-btn');
let addBtn = document.querySelector('.profile__add-btn');
let editName = document.querySelector('.profile__user-name');
let editJob = document.querySelector('.profile__user-profession')

const closeBtn_profile = document.querySelector('.popup__close-btn_profile');
const closeBtn_place = document.querySelector('.popup__close-btn_place');
let formElement_profile = document.querySelector('.popup__container_profile');
const formElement_place = document.querySelector('.popup__container_place');
let nameInput = formElement_profile.querySelector('.popup__field_user-name');
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

elements.append(initialCards_element);
});

function popupOpen_profile() {
    popupProfile.classList.toggle('popup_opened');
}
function popupOpen_place() {
    popupPlace.classList.toggle('popup_opened');
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
    elements.prepend(initialCards_element);
}

addBtn.addEventListener('click', popupOpen_place);
editBtn.addEventListener('click', editProfile);
formElement_profile.addEventListener('submit', handleFormSubmit);
formElement_place.addEventListener('submit', placeForm);
closeBtn_profile.addEventListener('click', popupOpen_profile);
closeBtn_place.addEventListener('click', popupOpen_place);
console.log(initialCards);