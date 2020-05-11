import API from "../api.js";
import DetailsPopupComponent from "../components/details-popup.js";
import FilmCardComponent from "../components/card.js";
import FilmModel from "../models/movie.js";
import CommentsModel from "../models/comments.js";
import {AUTHORIZATION, Button, END_POINT, FilmControl} from "../utils/consts.js";
import {render, remove, replace} from "../utils/render.js";

export default class MovieController {
  constructor(container, onDataChange, onViewChange, onCommentDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._onCommentDataChange = onCommentDataChange;
    this._commentsModel = null;

    this._cardComponent = null;
    this._popupComponent = null;
    this._card = null;
    this._comments = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onCardClick = this._onCardClick.bind(this);
    this._onCommentChange = this._onCommentChange.bind(this);
    this._onCommentClick = this._onCommentClick.bind(this);
  }

  render(card, comments) {
    this._card = card;
    this._comments = comments;

    this._cardComponent = new FilmCardComponent(this._card, this._comments);

    // отрисуем карточку фильма
    render(this._container, this._cardComponent);

    // показ попапа с подробной информацией о фильме
    this._cardComponent.setClickHandler(this._onCardClick);

    // кнопки watchlist, watched, favourite
    this._subscribeCardControlsOnEvents();
  }

  get card() {
    return this._card;
  }

  setDefaultView() {
    if (this._popupComponent) {
      remove(this._popupComponent);
    }
  }

  destroy() {
    remove(this._cardComponent);
  }

  _onCardClick() {
    this._onViewChange();
    const api = new API(AUTHORIZATION, END_POINT);

    api.getComments(this._card.id)
      .then((comments) => {
        this._commentsModel = new CommentsModel();
        this._commentsModel.setComments(comments);
        const siteBodyElement = document.querySelector(`body`);
        this._popupComponent = new DetailsPopupComponent(this._card, this._commentsModel);
        render(siteBodyElement, this._popupComponent);

        this._subscribePopupOnEvents();
      })
  }

  _onCloseButtonClick() {
    const newControls = this._popupComponent.getData();
    const newCard = FilmModel.clone(this._card);
    newCard.controls = newControls;

    this._onDataChange(this._card, newCard);

    remove(this._popupComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === Button.ESCAPE) {
      const newControls = this._popupComponent.getData();
      const newCard = FilmModel.clone(this._card);
      newCard.controls = newControls;

      this._onDataChange(this._card, newCard);

      remove(this._popupComponent);
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }

  _onCommentChange(oldComment, newComment) {
    if (newComment === null) { // удалить
      this._commentsModel.removeComment(this._card, oldComment);
    } else if (oldComment === null) { // добавить
      this._commentsModel.addComment(this._card, newComment);
    }
  }

  _onCommentClick(comment) {
    this._onCommentChange(comment, null);
  }

  _subscribePopupOnEvents() {
    this._popupComponent.setDeleteCommentClickHandler(this._onCommentClick);

    this._popupComponent.setNewCommentSubmitHandler((newComment) => {
      this._onCommentChange(null, newComment);
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

  _changeControlsData(value) {
    const newCard = FilmModel.clone(this._card);
    newCard.controls[value] = !newCard.controls[value];

    this._onDataChange(this._card, newCard);
  }
}
