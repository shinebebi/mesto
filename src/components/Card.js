import PopupWithConfirm from "./PopupWithConfirm.js";

export default class Card {
    constructor({ data, handleCardClick }, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._confirmPopup = document.querySelector('.popup_confirm')
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners()
        const elementPhoto = this._element.querySelector('.element__photo');
        this._element.querySelector('.element__name').textContent = this._name;
        elementPhoto.src = this._link;
        elementPhoto.alt = this._name;
        return this._element;
    }

    _handleLikeCard() {
        this._element.querySelector('.element__like-btn').classList.toggle('element__like-btn_active');
    }

    _handleDeleteCard() {
        const confMessage = new PopupWithConfirm({
            popupSelector: this._confirmPopup,
            handleDeleteCard: () => {
                this._element.remove();
            }
        })
        confMessage.open()
        confMessage.setEventListeners()
    }

    _setEventListeners() {
        this._element.querySelector('.element__like-btn').addEventListener('click', () => {
            this._handleLikeCard()
        });
        this._element.querySelector('.element__trash-btn').addEventListener('click', () => {
            this._handleDeleteCard()
        });
        this._cardImage = this._element.querySelector('.element__photo')
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        });
    }
}