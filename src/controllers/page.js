import {ESC_BUTTON, COMMENTS_TO_SHOW, FilmsCount, extraFilms} from "../utils/consts.js";
import {render, remove} from "../utils/render.js";
import DetailsPopupComponent from "../components/details-popup.js";
import CommentsComponent from "../components/comment.js";
import NoFilmsComponent from "../components/no-films.js";
import FilmCardComponent from "../components/card.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import ExtraFilmComponent from "../components/extra-films.js";
import FilmListComponent from "../components/films-list.js";
import {getRandomIntegerNumber} from "../utils/common.js";

const showComments = (containerElement, comments) => {
  const commentsToShow = COMMENTS_TO_SHOW <= comments.length ? COMMENTS_TO_SHOW : comments.length;
  for (let i = 0; i < commentsToShow; i++) {
    render(containerElement, new CommentsComponent(comments[i]));
  }
};

const renderCard = (filmsListContainerElement, card, comments) => {
  const cardComponent = new FilmCardComponent(card, comments.length);
  const popupComponent = new DetailsPopupComponent(card, comments.length);

  const commentsList = popupComponent.getElement().querySelector(`.film-details__comments-list`);
  showComments(commentsList, comments);

  const siteBodyElement = document.querySelector(`body`);

  const escKeyDownHandler = (evt) => {
    if (evt.key === ESC_BUTTON) {
      remove(popupComponent);
      document.removeEventListener(`keydown`, escKeyDownHandler);
    }
  };

  const closeButtonClickHandler = () => {
    remove(popupComponent);
    document.removeEventListener(`keydown`, escKeyDownHandler);
  }

  const cardClickHandler = (evt) => {
    render(siteBodyElement, popupComponent);

    popupComponent.setCloseButtonClickHandler(closeButtonClickHandler);

    document.addEventListener(`keydown`, escKeyDownHandler);
  };

  render(filmsListContainerElement, cardComponent);

  cardComponent.setClickHandler(cardClickHandler);
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._filmsListComponent = new FilmListComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  render(films, comments) {
    render(this._container.getElement(), this._filmsListComponent);

    if (FilmsCount.FILMS_COUNT === 0) {
      render(this._filmsListComponent.getElement(), this._noFilmsComponent);
      return;
    }

    const filmsListContainerElement = this._container.getElement().querySelector(`.films-list__container`);
    const showingFilmsCount = FilmsCount.SHOWING_FILMS_COUNT_ON_START;
    films.slice(0, showingFilmsCount).forEach((it, index) => renderCard(filmsListContainerElement, it, comments[index]));

    if (FilmsCount.FILMS_COUNT <= FilmsCount.SHOWING_FILMS_COUNT_ON_START) {
      return;
    }

    render(this._filmsListComponent.getElement(), this._showMoreButtonComponent);

    let previousFilmsCount = showingFilmsCount;
    this._showMoreButtonComponent.setClickHandler(() => {
      films.slice(previousFilmsCount, previousFilmsCount + FilmsCount.SHOWING_FILMS_COUNT_BY_BUTTON).forEach((it, index) => renderCard(filmsListContainerElement, it, comments[index]));
      previousFilmsCount += FilmsCount.SHOWING_FILMS_COUNT_BY_BUTTON;
      if (previousFilmsCount >= films.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  renderExtra(films, comments) {
    extraFilms.forEach(title => {
      const extraFilmsListComponent = new ExtraFilmComponent(title);
      render(this._container.getElement(), extraFilmsListComponent);

      const filmsListContainerElement = extraFilmsListComponent.getElement().querySelector(`.films-list__container`);

      for (let i = 0; i < FilmsCount.EXTRA_FILMS_COUNT; i++) {
        const i = getRandomIntegerNumber(0, FilmsCount.FILMS_COUNT - 1);
        renderCard(filmsListContainerElement, films[i], comments[i]);
      }
    });
  }
};
