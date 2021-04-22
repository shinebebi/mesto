export default class UserInfo {
    constructor({userName, userProf}) {
        this._userName = document.querySelector(userName);
        this._userProf = document.querySelector(userProf);
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