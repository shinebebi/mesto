let editBtn = document.querySelector('.profile__edit-btn');
let closeBtn = document.querySelector('.popup__close-btn');
let submitBtn = document.querySelector('.popup__submit-btn');
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__user-name');
let jobInput = formElement.querySelector('.popup__user-job');
let editName = document.querySelector('.profile__user-name');
let popup = document.querySelector('.popup');
let editJob = document.querySelector('.profile__user-profession');
function editProfile () {
    popup.classList.toggle('popup_opened');
    nameInput.value = editName.textContent;
    jobInput.value = editJob.textContent;
}
function closeProfile () {
    popup.classList.toggle('popup_opened');
}
function handleFormSubmit (evt) {
    evt.preventDefault();
    editName.textContent = nameInput.value;
    editJob.textContent = jobInput.value;
    editProfile()
}
editBtn.addEventListener('click', editProfile);
formElement.addEventListener('submit', handleFormSubmit);
closeBtn.addEventListener('click', closeProfile);