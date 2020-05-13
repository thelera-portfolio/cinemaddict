// звание пользователя
import AbstractComponent from "./abstract-component.js";
import {Rank} from "../utils/consts.js";

export const getUserRank = (count) => {
  let rank = ``;

  Object.keys(Rank).forEach((key) => {
    if (count > Rank[key].value) {
      rank = Rank[key].name;
    }
  });

  return rank;
};

const createUserProfileRatingTemplate = (films) => {
  const watchedFilmsCount = films.filter((film) => film.controls.isWatched).length;

  const rank = getUserRank(watchedFilmsCount);

  return (`<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`);
};


export default class Rating extends AbstractComponent {
  constructor(filmsModel) {
    super();

    this._filmsModel = filmsModel;
  }

  getTemplate() {
    return createUserProfileRatingTemplate(this._filmsModel.getFilms());
  }
}
