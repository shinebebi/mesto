import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._photoPopupImg = this._popup.querySelector('.photo-popup__img');
        this._photoPopupHeader = this._popup.querySelector('.photo-popup__header');
    }

    open(item) {
        this._photoPopupHeader.textContent = item.name;
        this._photoPopupImg.src = item.link;
        this._photoPopupImg.alt = item.name;
        super.open()
    }
}