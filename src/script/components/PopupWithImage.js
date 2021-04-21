import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(item) {
        const elementPhoto = this._popup.querySelector('.photo-popup__img');
        this._popup.querySelector('.photo-popup__header').textContent = item.name;
        elementPhoto.src = item.link;
        elementPhoto.alt = item.name;
        super.open()
    }
}