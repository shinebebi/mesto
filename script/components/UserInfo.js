export default class UserInfo {
    constructor({userName, userProf}) {
        this._userName = userName;
        this._userProf = userProf;
    }

    getUserInfo() {
        return {
            userName: this._userName.textContent,
            userProf: this._userProf.textContent
        }
    }

    setUserInfo(userInfo) {
        this._editName = document.querySelector('.profile__user-name');
        this._editJob = document.querySelector('.profile__user-profession')
        this._editName.textContent = userInfo.username;
        this._editJob.textContent = userInfo.userjob;
    }
}