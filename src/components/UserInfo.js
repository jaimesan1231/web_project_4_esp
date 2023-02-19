class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }
  getUserInfo() {
    return { name: this._name.textContent, job: this._job.textContent };
  }
  setUserInfo({ name, job, id }) {
    this._name.textContent = name;
    this._job.textContent = job;
    this._id = id;
  }
  getUserId() {
    return this._id;
  }
}

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
});

export default userInfo;
