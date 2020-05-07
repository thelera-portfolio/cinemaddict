// звание пользователя
import AbstractComponent from "./abstract-component.js";

const createUserProfileRatingTemplate = (rank) =>
  `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;

export default class Rating extends AbstractComponent {
  constructor(count) {
    super();

    this._count = count;
  }

  getTemplate() {
    return createUserProfileRatingTemplate(this._count);
  }
}
