export default class UserInfo {
    constructor({userName, userProf, userAvatar}) {
        this._userName = document.querySelector(userName);
        this._userProf = document.querySelector(userProf);
        this._userAvatar = document.querySelector(userAvatar)
    }

    getAvatarInfo() {
        return {
            userAvatar: this._userAvatar.src
        }
    }
    setAvatarInfo(avatarInfo) {
        this._userAvatar.src = avatarInfo.avatar;
    }

    getUserInfo() {
        return {
            userName: this._userName.textContent,
            userProf: this._userProf.textContent
        }
    }

    setUserInfo(userInfo) {
        this._userName.textContent = userInfo.username;
        this._userProf.textContent = userInfo.userjob;
    }
}