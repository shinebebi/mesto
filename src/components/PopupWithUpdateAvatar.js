export default class PopupWithUpdateAvatar {
    constructor({ userAvatar }) {
        this._userAvatar = document.querySelector(userAvatar);
    }
    getAvatarInfo() {
        return {
            userAvatar: this._userAvatar.src
        }
    }
    setAvatarInfo(avatarInfo) {
        this._userAvatar.src = avatarInfo.avatar;
    }
}