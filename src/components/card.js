import {MAX_DESCRIPTION_LENGTH} from "../utils/consts.js";
import {fromMinutesToHours} from "../utils/common.js";
import AbstractComponent from "./abstract-component.js";
import {Button} from "../utils/consts.js";
import moment from "moment";

const createButtonMarkup = (name, label, isActive = true) =>
  `<button class="film-card__controls-item button film-card__controls-item--${name} ${isActive ? `film-card__controls-item--active` : ``}">${label}</button>`;


const createFilmCardTemplate = (card, comments) => {
  const {description, duration: durationInMinutes, genres, image, rating, releaseDate, title} = card;

  const shortDescription = description.length >= MAX_DESCRIPTION_LENGTH ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...` : description;
  const commentsCount = comments.length;
  const duration = fromMinutesToHours(durationInMinutes);
  const filmReleaseDate = moment(releaseDate).format(`YYYY`);

  const watchlistButton = createButtonMarkup(Button.WATCHLIST.name, Button.WATCHLIST.label, card.controls.isAddedToWatchlist);
  const watchedButton = createButtonMarkup(Button.WATCHED.name, Button.WATCHED.label, card.controls.isWatched);
  const favouritesButton = createButtonMarkup(Button.FAVOURITE.name, Button.FAVOURITE.label, card.controls.isFavourite);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${filmReleaseDate}</span>
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
  constructor(card, comments) {
    super();
    this._card = card;
    this._comments = comments;
  }

  getTemplate() {
    return createFilmCardTemplate(this._card, this._comments);
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
