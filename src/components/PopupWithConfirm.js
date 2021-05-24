import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor({ popupSelector, handleDeleteCard}) {
        super(popupSelector)
        this._deleteCard = handleDeleteCard;
        this._handler = this._handler.bind(this);
        this._confirmMessage = this._popup.querySelector('.popup__container_confirm');
        this._confBtn = this._popup.querySelector('.popup__submit-btn_confirm')
    }

    _handler(evt) {
        evt.preventDefault()
        this._deleteCard()
        this.close()
    }

    close() {
        super.close();
        this._confirmMessage.removeEventListener('submit', this._handler);
    }

    setEventListeners() {
        super.setEventListeners();
        this._confirmMessage.addEventListener('submit', this._handler)
    }
}