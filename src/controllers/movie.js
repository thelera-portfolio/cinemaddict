import DetailsPopupComponent from "../components/details-popup.js";
import FilmCardComponent from "../components/card.js";
import FilmModel from "../models/movie.js";
import {ESC_BUTTON, FilmControl} from "../utils/consts.js";
import {render, remove, replace} from "../utils/render.js";

export default class MovieController {
  constructor(container, onDataChange, onViewChange, onCommentDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._onCommentDataChange = onCommentDataChange;

    this._cardComponent = null;
    this._popupComponent = null;
    this._card = null;
    this._comments = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
  }

  render(card, comments) {
    this._card = card;
    this._comments = comments;

    const oldCardComponent = this._cardComponent;
    const oldPopupComponent = this._popupComponent;

    this._cardComponent = new FilmCardComponent(this._card, comments);
    this._popupComponent = new DetailsPopupComponent(this._card, comments);

    const siteBodyElement = document.querySelector(`body`);

    // отрисуем карточку фильма
    if (oldCardComponent && oldPopupComponent) {
      replace(this._cardComponent, oldCardComponent);
      replace(this._popupComponent, oldPopupComponent);

      this._subscribePopupOnEvents();
    } else {
      render(this._container, this._cardComponent);
    }

    const cardClickHandler = () => {
      this._onViewChange();
      render(siteBodyElement, this._popupComponent);

      this._subscribePopupOnEvents();
    };

    // показ попапа с подробной информацией о фильме
    this._cardComponent.setClickHandler(cardClickHandler);

    // кнопки watchlist, watched, favourite
    this._subscribeCardControlsOnEvents();
  }

  get card() {
    return this._card;
  }

  setDefaultView() {
    remove(this._popupComponent);
  }

  destroy() {
    remove(this._cardComponent);
    remove(this._popupComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _onCloseButtonClick() {
    remove(this._popupComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === ESC_BUTTON) {
      remove(this._popupComponent);
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }

  _subscribePopupOnEvents() {
    this._popupComponent.setAddToWatchlistClickHandler((evt) => {
      evt.preventDefault();

      this._changeControlsData(FilmControl.WATCHLIST);
    });

    this._popupComponent.setMarkAsWatchedClickHandler((evt) => {
      evt.preventDefault();

      this._changeControlsData(FilmControl.WATCH);
    });

    this._popupComponent.setAddToFavouritesClickHandler((evt) => {
      evt.preventDefault();

      this._changeControlsData(FilmControl.FAVOURITE);
    });

    this._popupComponent.setDeleteCommentClickHandler((evt) => {
      evt.preventDefault();

      const comment = evt.target.dataset;

      this._onCommentDataChange(this._card, comment, null);
    });

    this._popupComponent.setNewCommentSubmitHandler((newComment) => {
      this._onCommentDataChange(this._card, null, newComment);
    });

    this._popupComponent.setEmotionClickHandler();
    this._popupComponent.setCloseButtonClickHandler(this._onCloseButtonClick);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _subscribeCardControlsOnEvents() {
    this._cardComponent.setAddToWatchlistClickHandler((evt) => {
      evt.preventDefault();

      this._changeControlsData(FilmControl.WATCHLIST);
    });

    this._cardComponent.setMarkAsWatchedClickHandler((evt) => {
      evt.preventDefault();

      this._changeControlsData(FilmControl.WATCH);
    });

    this._cardComponent.setAddToFavouritesClickHandler((evt) => {
      evt.preventDefault();

      this._changeControlsData(FilmControl.FAVOURITE);
    });
  }

  _changeControlsData(control) {
    const newCard = FilmModel.clone(this._card);
    newCard[control] = !newCard[control];

    this._onDataChange(this._card, newCard);
  }
}
