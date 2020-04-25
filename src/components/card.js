// карточка фильма
import {MAX_DESCRIPTION_LENGTH} from "../mock/card.js";
import AbstractComponent from "./abstract-component.js";

const createButtonMarkup = (name, label, isActive = true) => {
  return (
    `<button class="film-card__controls-item button film-card__controls-item--${name} ${isActive ? `film-card__controls-item--active` : ``}">${label}</button>`
  );
};

const createFilmCardTemplate = (card, commentsCount) => {
  const {description, duration, genres, image, rating, releaseDate, title} = card;
  const shortDescription = description.length >= MAX_DESCRIPTION_LENGTH ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...` : description;

  const watchlistButton = createButtonMarkup(`add-to-watchlist`, `Add to watchlist`, card.controls.isAddedToWatchlist);
  const watchedButton = createButtonMarkup(`mark-as-watched`, `Mark as watched`, card.controls.isWatched);
  const favouritesButton = createButtonMarkup(`favorite`, `Mark as favourite`, card.controls.isFavourite);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseDate.getFullYear()}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src=${image} alt="" class="film-card__poster">
      <p class="film-card__description">${shortDescription}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        ${watchlistButton}
        ${watchedButton}
        ${favouritesButton}
      </form>
    </article>`
  );
};

export default class Card extends AbstractComponent {
  constructor(card, commentsCount) {
    super();
    this._card = card;
    this._commentsCount = commentsCount;
  }

  getTemplate() {
    return createFilmCardTemplate(this._card, this._commentsCount);
  }

  setClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }


  setAddToWatchlistClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setMarkAsWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setAddToFavouritesClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}
