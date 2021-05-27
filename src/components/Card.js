import PopupWithConfirm from "./PopupWithConfirm.js";
import {api} from '../pages/index.js'
export default class Card {
    constructor({ data, handleCardClick}, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._ownerId = data.owner._id;
        this._likeNumber = data.likes;
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
        this._element.querySelector('.element__like-number').textContent = this._likeNumber.length;
        api.getUserInfo()
            .then(data => {
                if (this._ownerId === data._id) {
                    this._element.querySelector('.element__trash-btn').classList.add('element__trash-btn_active')
                }
                if (this._likeNumber.some(e => e._id === data._id)) {
                    this._element.querySelector('.element__like-btn').classList.add('element__like-btn_active')
                }
            })
        return this._element;
    }

    _handleLikeCard() {
        this._likesNumber = this._element.querySelector('.element__like-number')
        this._likeIconActive = this._element.querySelector('.element__like-btn_active')
        if (this._likeIconActive) {
            this._likesNumber.textContent = String(Number(this._likesNumber.textContent) - 1)
            api.deleteLike(this._id)
                .catch(err => console.log(err))
        } else {
            this._likesNumber.textContent = String(Number(this._likesNumber.textContent) + 1)
            api.putLike(this._id)
                .catch(err => console.log(err))
        }
        this._element.querySelector('.element__like-btn').classList.toggle('element__like-btn_active');
    }

    _handleDeleteCard() {
        const confMessage = new PopupWithConfirm({
            popupSelector: this._confirmPopup,
            handleDeleteCard: () => {
                api.deleteCard(this._id)
                    .then(() => this._element.remove())
                    .catch(err => console.log(err))
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