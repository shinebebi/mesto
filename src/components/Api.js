export default class Api {
    constructor(options) {
        this._userInfoUrl = options.userInfoUrl
        this._cardsUrl = options.cardsUrl
        this._avatarUrl = options.avatarUrl
        this._headers = options.headers
        this._token = this._headers.authorization
    }

    getUserInfo() {
        return fetch(this._userInfoUrl, {
            headers: {
                authorization: this._token
            }
        })
            .then(res => res.json())
            .catch(err => {
                console.log(err);
            })
    }

    getInitialCards() {
        return fetch(this._cardsUrl, {
            headers: {
                authorization: this._token,
                'content-type': 'application/json'
            }
        })
            .then(res => {
                return res.json();
            })
            .catch(err => {
                console.log(err);
            })
    }

    editProfile() {
        return fetch(this._userInfoUrl, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this._name.textContent,
                about: this._job.textContent
            })
        })
            .catch(err => {
                console.log(err)
            })
    }

    addCard(cardData) {
        return fetch(this._cardsUrl, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: cardData.name,
                link: cardData.link
            })
        })
            .then(res => res.json())
            .catch(err => {
                console.log(err)
            })
    }

    deleteCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-24/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .catch(err => {
                console.log(err)
            })
    }

    putLike(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-24/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .catch(err => {
                console.log(err)
            })
    }

    deleteLike(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-24/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .catch(err => {
                console.log(err)
            })
    }

    avatarUpdate() {
        return fetch(this._avatarUrl, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: this._avatar.src
            })
        })
            .catch(err => {
                console.log(err)
            })
    }
}