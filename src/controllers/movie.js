import CommentsModel from "../models/comments.js";
import DetailsPopupComponent from "../components/details-popup.js";
import FilmCardComponent from "../components/card.js";
import FilmModel from "../models/movie.js";
import {Button, FilmControl, SHAKE_ANIMATION_TIMEOUT} from "../utils/consts.js";
import {render, remove, replace} from "../utils/render.js";

export default class MovieController {
  constructor(container, onDataChange, onViewChange, api, extraType = null) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._api = api;
    this._extraType = extraType;

    this._isCommentsChanged = false;

    this._card = null;
    this._commentsModel = null;
    this._cardComponent = null;
    this._popupComponent = null;

    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onCardClick = this._onCardClick.bind(this);
    this._onCommentChange = this._onCommentChange.bind(this);
    this._onCommentClick = this._onCommentClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  get card() {
    return this._card;
  }

  get extraType() {
    return this._extraType;
  }

  destroy() {
    remove(this._cardComponent);
  }

  render(card) {
    this._card = card;

    const oldCardComponent = this._cardComponent;
    this._cardComponent = new FilmCardComponent(this._card);

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
      const cardControls = this._popupComponent.getData().controls;
      const newCard = FilmModel.clone(this._card);

      if (JSON.stringify(cardControls) !== JSON.stringify(this._card.controls) || this._isCommentsChanged) {
        newCard.controls = cardControls;

        this._onDataChange(this._card, newCard);

        if (this._isCommentsChanged) {
          this._onCommentsCountChange();
          this._isCommentsChanged = false;
        }
      }

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

  _onCommentChange(oldCommentId, newComment) {
    this._isCommentsChanged = true;

    if (newComment === null) { // удалить
      this._api.deleteComment(oldCommentId, this.card.id)
        .then(() => (this._commentsModel.removeComment(oldCommentId)))
        .catch ((err) => {
          console.log(err);
          const commentsElements = this._popupComponent.getElement().querySelectorAll(`.film-details__comment`);
          const commentElement = Array.from(commentsElements).find((element) => element.dataset.id === oldCommentId);

          this._popupComponent.enableCommentButton(oldCommentId);
          this._popupComponent.shakeComment(commentElement);
        });
    } else if (oldCommentId === null) { // добавить
      this._api.addComment(this._card.id, newComment)
        .then((data) => {
          this._popupComponent.enable();
          this._commentsModel.addComment(this._card, data);
        })
        .catch((err) => {
          console.log(err);
          this._popupComponent.enable();
          this._popupComponent.shake();
        });
    }
  }

  _onCommentClick(commentId) {
    this._popupComponent.setDeletindButton(commentId);
    this._popupComponent.disableCommentButton(commentId);

    this._onCommentChange(commentId, null);
  }

  _onCloseButtonClick() {
    const cardControls = this._popupComponent.getData().controls;
    const newCard = FilmModel.clone(this._card);

    if (JSON.stringify(cardControls) !== JSON.stringify(this._card.controls) || this._isCommentsChanged) {
      newCard.controls = cardControls;

      this._onDataChange(this._card, newCard);

      this._isCommentsChanged = false;
    }

    remove(this._popupComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _subscribePopupOnEvents() {
    this._popupComponent.setDeleteCommentClickHandler(this._onCommentClick);

    this._popupComponent.setNewCommentSubmitHandler((newComment) => {
      this._popupComponent.disable();

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
