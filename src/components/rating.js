// звание пользователя
import AbstractSmartComponent from "./abstract-smart-component.js";
import {Rank} from "../utils/consts.js";
import {getFilmsByFilter} from "../utils/filter.js";
import {FilterType} from "../utils/consts.js";

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
  const watchedFilmsCount = getFilmsByFilter(FilterType.HISTORY).length;

  const rank = getUserRank(watchedFilmsCount);

  return (`<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`);
};


export default class Rating extends AbstractSmartComponent {
  constructor(filmsModel) {
    super();

    this._films = filmsModel;
  }

  getTemplate() {
    return createUserProfileRatingTemplate(this._films.getFilms());
  }

  recoveryListeners() {}
}
