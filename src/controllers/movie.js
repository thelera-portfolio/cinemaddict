
import DetailsPopupComponent from "../components/details-popup.js";
import FilmCardComponent from "../components/card.js";
import CommentsComponent from "../components/comment.js";
import {ESC_BUTTON, COMMENTS_TO_SHOW} from "../utils/consts.js";
import {render, remove, replace} from "../utils/render.js";

const showComments = (containerElement, comments) => {
  const commentsToShow = COMMENTS_TO_SHOW <= comments.length ? COMMENTS_TO_SHOW : comments.length;
  for (let i = 0; i < commentsToShow; i++) {
    render(containerElement, new CommentsComponent(comments[i]));
  }
};

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._cardComponent = null;
    this._popupComponent = null;
    this.card = null;
  }

  render(card, comments) {
    this.card = card;
    const oldCardComponent = this._cardComponent;
    const oldPopupComponent = this._popupComponent;

    this._cardComponent = new FilmCardComponent(this.card, comments.length);
    this._popupComponent = new DetailsPopupComponent(this.card, comments.length);

    const commentsList = this._popupComponent.getElement().querySelector(`.film-details__comments-list`);
    showComments(commentsList, comments);

    const siteBodyElement = document.querySelector(`body`);

    // отрисуем карточку фильма
    if (oldCardComponent && oldPopupComponent) {
      replace(this._cardComponent, oldCardComponent);
      replace(this._popupComponent, oldPopupComponent);
    } else {
      render(this._container, this._cardComponent);
    }

    // обработчики
    const escKeyDownHandler = (evt) => {
      if (evt.key === ESC_BUTTON) {
        remove(this._popupComponent);
        document.removeEventListener(`keydown`, escKeyDownHandler);
      }
    };

    const closeButtonClickHandler = () => {
      remove(this._popupComponent);
      document.removeEventListener(`keydown`, escKeyDownHandler);
    };

    const cardClickHandler = () => {
      render(siteBodyElement, this._popupComponent);

      this._popupComponent.setCloseButtonClickHandler(closeButtonClickHandler);

      document.addEventListener(`keydown`, escKeyDownHandler);
    };

    // показ попапа с подробной информацией о фильме
    this._cardComponent.setClickHandler(cardClickHandler);

    // кнопки watchlist, watched, favourite
    this._cardComponent.setAddToWatchlistClickHandler(() => {
      this._onDataChange(this.card, Object.assign({}, this.card, {
        controls: {
          isAddedToWatchlist: !this.card.controls.isAddedToWatchlist,
          isWatched: this.card.controls.isWatched,
          isFavourite: this.card.controls.isFavourite,
        },
      }));
    });
    this._cardComponent.setMarkAsWatchedClickHandler(() => {
      this._onDataChange(this.card, Object.assign({}, this.card, {
        controls: {
          isAddedToWatchlist: this.card.controls.isAddedToWatchlist,
          isWatched: !this.card.controls.isWatched,
          isFavourite: this.card.controls.isFavourite,
        },
      }));
    });
    this._cardComponent.setAddToFavouritesClickHandler(() => {
      this._onDataChange(this.card, Object.assign({}, this.card, {
        controls: {
          isAddedToWatchlist: this.card.controls.isAddedToWatchlist,
          isWatched: this.card.controls.isWatched,
          isFavourite: !this.card.controls.isFavourite,
        },
      }));
    });
  }
}
