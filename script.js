let likeBtn = document.querySelector('.element__like-btn');
let editBtn = document.querySelector('.profile__edit-btn');
let closeBtn = document.querySelector('.popup__close-btn');
let submitBtn = document.querySelector('.popup__submit-btn');
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__user-name');
let jobInput = formElement.querySelector('.popup__user-job');
function getLike () {
    likeBtn.classList.toggle('element__like-btn_active');
}
function editProfile () {
    let popup = document.querySelector('.popup')
    popup.classList.toggle('popup_opened');
}
function handleFormSubmit (evt) {
    evt.preventDefault();
    let editName = document.querySelector('.profile__user-name');
    let editJob = document.querySelector('.profile__user-profession');
    editName.textContent = nameInput.value;
    editJob.textContent = jobInput.value;
}
submitBtn.addEventListener('click', editProfile);
likeBtn.addEventListener('click', getLike);
editBtn.addEventListener('click', editProfile);
submitBtn.addEventListener('click', handleFormSubmit);
closeBtn.addEventListener('click', editProfile);