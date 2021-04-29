import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor({ popupSelector, handleDeleteCard }) {
        super(popupSelector)
        this._deleteCard = handleDeleteCard
        this._confirmMessage = this._popup.querySelector('.popup__container_confirm')
    }
    setEventListeners() {
        super.setEventListeners();
        this._confirmMessage.addEventListener('submit', evt => {
            evt.preventDefault()
            this._deleteCard()
            this.close()
        })
    }
}