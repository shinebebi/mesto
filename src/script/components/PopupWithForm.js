import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._formSubm = handleFormSubmit
        this._form = this._popup.querySelector('.popup__container')
    }

    close() {
        this._fieldsList = Array.from(this._popup.querySelectorAll('.popup__field'));
        this._fieldsList.forEach(field => {
            field.value = ''
        })
        super.close()
    }

    _getInputValues() {
        this._fieldsList = Array.from(this._popup.querySelectorAll('.popup__field'));
        this._valuesOfField = {}
        this._fieldsList.forEach(field => {
            this._valuesOfField[field.name] = field.value
        })
        this.close()
        return this._valuesOfField
    }

    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', evt => {
            evt.preventDefault()
            this._formSubm(this._getInputValues())
        });
    }

}