import DetailsPopupComponent from "../components/details-popup.js";
import FilmCardComponent from "../components/card.js";
import FilmModel from "../models/movie.js";
import CommentsModel from "../models/comments.js";
import {Button, FilmControl} from "../utils/consts.js";
import {render, remove, replace} from "../utils/render.js";

export default class MovieController {
  constructor(container, onDataChange, onViewChange, api) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._commentsModel = null;
    this._api = api;

    this._cardComponent = null;
    this._popupComponent = null;
    this._card = null;
    this._comments = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onCardClick = this._onCardClick.bind(this);
    this._onCommentChange = this._onCommentChange.bind(this);
    this._onCommentClick = this._onCommentClick.bind(this);
  }

  get card() {
    return this._card;
  }

  destroy() {
    remove(this._cardComponent);
  }

  render(card, comments) {
    this._card = card;
    this._comments = comments;

    const oldCardComponent = this._cardComponent;
    this._cardComponent = new FilmCardComponent(this._card, this._comments);

    // отрисуем карточку фильма
    if (oldCardComponent) {
      replace(this._cardComponent, oldCardComponent);
    } else {
      render(this._container, this._cardComponent);
    }

    // показ попапа с подробной информацией о фильме
    this._cardComponent.setClickHandler(this._onCardClick);

    // кнопки watchlist, watched, favourite
    this._subscribeCardControlsOnEvents();
  }

  setDefaultView() {
    if (this._popupComponent) {
      remove(this._popupComponent);
    }
  }

  _changeControlsData(value) {
    const newCard = FilmModel.clone(this._card);
    newCard.controls[value] = !newCard.controls[value];

    this._onDataChange(this._card, newCard);
  }

  _onEscKeyDown(evt) {
    if (evt.key === Button.ESCAPE) {
      const newControls = this._popupComponent.getData();
      const newCard = FilmModel.clone(this._card);
      newCard.controls = newControls;

      this._onDataChange(this._card, newCard);

      remove(this._popupComponent);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _onCardClick() {
    this._onViewChange();

    this._api.getComments(this._card.id)
      .then((comments) => {
        this._commentsModel = new CommentsModel();
        this._commentsModel.setComments(comments);
        const siteBodyElement = document.querySelector(`body`);
        this._popupComponent = new DetailsPopupComponent(this._card, this._commentsModel);
        render(siteBodyElement, this._popupComponent);

        this._subscribePopupOnEvents();
      });
  }

  _onCommentChange(oldComment, newComment) {
    if (newComment === null) { // удалить
      this._api.deleteComment(oldComment.id)
        .then(() => (this._commentsModel.removeComment(oldComment)));
    } else if (oldComment === null) { // добавить
      this._api.addComment(this._card.id, newComment)
        .then((data) => {
          this._commentsModel.addComment(this._card, data.comments);
        });
    }
  }

  _onCommentClick(comment) {
    this._onCommentChange(comment, null);
  }

  _onCloseButtonClick() {
    const newControls = this._popupComponent.getData().controls;
    const newCard = FilmModel.clone(this._card);
    newCard.controls = newControls;

    this._onDataChange(this._card, newCard);

    remove(this._popupComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _subscribePopupOnEvents() {
    this._popupComponent.setDeleteCommentClickHandler(this._onCommentClick);

    this._popupComponent.setNewCommentSubmitHandler((newComment) => {
      this._onCommentChange(null, newComment);
    });

    this._popupComponent.setEmotionClickHandler();
    this._popupComponent.setCloseButtonClickHandler(this._onCloseButtonClick);
    document.addEventListener(`keydown`, this._onEscKeyDown);
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
}
