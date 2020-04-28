import DetailsPopupComponent from "../components/details-popup.js";
import FilmCardComponent from "../components/card.js";
import {ESC_BUTTON} from "../utils/consts.js";
import {render, remove, replace} from "../utils/render.js";

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._cardComponent = null;
    this._popupComponent = null;
    this.card = null;
  }

  render(card, comments) {
    this.card = card;
    const oldCardComponent = this._cardComponent;
    const oldPopupComponent = this._popupComponent;

    this._cardComponent = new FilmCardComponent(this.card, comments);
    this._popupComponent = new DetailsPopupComponent(this.card, comments);

    const siteBodyElement = document.querySelector(`body`);

    const closeButtonClickHandler = () => {
      remove(this._popupComponent);
      document.removeEventListener(`keydown`, escKeyDownHandler);
    };

    // отрисуем карточку фильма
    if (oldCardComponent && oldPopupComponent) {
      replace(this._cardComponent, oldCardComponent);
      replace(this._popupComponent, oldPopupComponent);

      this._popupComponent.setCloseButtonClickHandler(closeButtonClickHandler);
      this._subscribePopupOnEvents();
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

    const cardClickHandler = () => {
      this._onViewChange();
      render(siteBodyElement, this._popupComponent);

      this._subscribePopupOnEvents();
      this._popupComponent.subscribeOnEvents();
      this._popupComponent.setCloseButtonClickHandler(closeButtonClickHandler);
      document.addEventListener(`keydown`, escKeyDownHandler);
    };

    // показ попапа с подробной информацией о фильме
    this._cardComponent.setClickHandler(cardClickHandler);

    // кнопки watchlist, watched, favourite
    this._cardComponent.setAddToWatchlistClickHandler(() => {
      const changedControls = Object.assign(this.card.controls, {isAddedToWatchlist: !this.card.controls.isAddedToWatchlist});
      this._onDataChange(this.card, Object.assign({}, this.card, changedControls));
    });

    this._cardComponent.setMarkAsWatchedClickHandler(() => {
      const changedControls = Object.assign(this.card.controls, {isWatched: !this.card.controls.isWatched});
      this._onDataChange(this.card, Object.assign({}, this.card, changedControls));
    });

    this._cardComponent.setAddToFavouritesClickHandler(() => {
      const changedControls = Object.assign(this.card.controls, {isFavourite: !this.card.controls.isFavourite});
      this._onDataChange(this.card, Object.assign({}, this.card, changedControls));
    });
  }

  setDefaultView() {
    remove(this._popupComponent);
  }

  _subscribePopupOnEvents() {
    this._popupComponent.setAddToWatchlistClickHandler(() => {
      const changedControls = Object.assign(this.card.controls, {isAddedToWatchlist: !this.card.controls.isAddedToWatchlist});
      this._onDataChange(this.card, Object.assign({}, this.card, changedControls));
    });
    this._popupComponent.setMarkAsWatchedClickHandler(() => {
      const changedControls = Object.assign(this.card.controls, {isWatched: !this.card.controls.isWatched});
      this._onDataChange(this.card, Object.assign({}, this.card, changedControls));
    });
    this._popupComponent.setAddToFavouritesClickHandler(() => {
      const changedControls = Object.assign(this.card.controls, {isFavourite: !this.card.controls.isFavourite});
      this._onDataChange(this.card, Object.assign({}, this.card, changedControls));
    });
  }
}
