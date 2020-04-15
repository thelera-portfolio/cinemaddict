// звание пользователя
import {createStats} from "../mock/stats.js";
import {createElement} from "../utils.js";

const statisticData = createStats();
const {rank} = statisticData;

const createUserProfileRatingTemplate = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class Rating {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createUserProfileRatingTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

