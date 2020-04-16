// карточка фильма
import {MAX_DESCRIPTION_LENGTH} from "../mock/card.js";
import {createElement} from "../utils.js";

const createButtonMarkup = (button) => {
  const {isActive, className, name, label} = button;
  return (
    `<button class="${className} ${isActive ? `${className}--active` : ``} button ${className}--${label}${name}">Add to ${name}</button>`
  );
};

const createFilmCardTemplate = (card) => {
  const {commentsCount, controls, description, duration, genres, image, rating, releaseDate, title} = card;
  const shortDescription = description.length >= MAX_DESCRIPTION_LENGTH ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...` : description;
  const buttonsTemplate = controls.map((it) => createButtonMarkup(it)).join(`\n`);

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
      <form class="film-card__controls">${buttonsTemplate}</form>
    </article>`
  );
};

export default class Card {
  constructor(card) {
    this._card = card;
    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._card);
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
