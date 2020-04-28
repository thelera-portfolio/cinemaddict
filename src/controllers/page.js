import {extraFilms, FilmsCount, RenderPosition, SortType} from "../utils/consts.js";
import {remove, render} from "../utils/render.js";
import ExtraFilmComponent from "../components/extra-films.js";
import FilmListComponent from "../components/films-list.js";
import MovieController from "./movie.js";
import NoFilmsComponent from "../components/no-films.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import SortComponent from "../components/sort.js";

export default class PageController {
  constructor(container) {
    this._container = container;

    this._films = [];
    this._comments = [];
    this._showedFilmsControllers = [];
    this._showedExtraFilmsControllers = [];

    this._showingFilmsCount = FilmsCount.SHOWING_FILMS_COUNT_ON_START;

    this._filmsListComponent = new FilmListComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = new SortComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  renderFilms(films, comments) {
    this._films = films;
    this._comments = comments;

    this._films.forEach((it, index) => (it.id = index));
    this._comments.forEach((it, index) => (it.id = index));

    // отрисуем сортировку
    const siteMainElement = document.querySelector(`.main`);
    render(siteMainElement, this._sortComponent);

    // отрисовываем фильмы
    render(siteMainElement, this._container);
    render(this._container.getElement(), this._filmsListComponent, RenderPosition.AFTERBEGIN);

    if (FilmsCount.FILMS_COUNT === 0) {
      render(this._filmsListComponent.getElement(), this._noFilmsComponent);
      return;
    }

    const filmsListContainerElement = this._container.getElement().querySelector(`.films-list__container`);
    const newFilms = this._renderCards(filmsListContainerElement, this._films.slice(0, this._showingFilmsCount));
    this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);

    // отрисуем кнопку
    this._renderShowMoreButton();

    // сортировка
    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      this._showingFilmsCount = FilmsCount.SHOWING_FILMS_COUNT_BY_BUTTON;
      const sortedFilms = this._getSortedFilms(this._films, sortType, 0, this._showingFilmsCount);

      filmsListContainerElement.innerHTML = ``;
      remove(this._showMoreButtonComponent);

      const newSortedFilms = this._renderCards(filmsListContainerElement, sortedFilms);
      this._showedFilmsControllers = newSortedFilms;

      this._renderShowMoreButton();
    });
  }

  renderExtraFilms() {
    extraFilms.forEach((it) => {
      const extraFilmsListComponent = new ExtraFilmComponent(it.title);
      render(this._container.getElement(), extraFilmsListComponent);

      const filmsListContainerElement = extraFilmsListComponent.getElement().querySelector(`.films-list__container`);

      const filmsToRender = this._getSortedFilms(this._films, it.sortType, 0, FilmsCount.EXTRA_FILMS_COUNT);
      const newFilms = this._renderCards(filmsListContainerElement, filmsToRender);
      this._showedExtraFilmsControllers = this._showedExtraFilmsControllers.concat(newFilms);
    });
  }

  _renderShowMoreButton() {
    if (this._films.length <= FilmsCount.SHOWING_FILMS_COUNT_ON_START) {
      return;
    }

    render(this._filmsListComponent.getElement(), this._showMoreButtonComponent);

    const buttonClickHandler = () => {
      let previousFilmsCount = this._showingFilmsCount;
      this._showingFilmsCount = previousFilmsCount + FilmsCount.SHOWING_FILMS_COUNT_BY_BUTTON;

      const sortedFilms = this._getSortedFilms(this._films, this._sortComponent.getSortType(), previousFilmsCount, this._showingFilmsCount);

      const filmsListContainerElement = this._container.getElement().querySelector(`.films-list__container`);
      const newFilms = this._renderCards(filmsListContainerElement, sortedFilms);
      this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);
      previousFilmsCount += FilmsCount.SHOWING_FILMS_COUNT_BY_BUTTON;

      if (previousFilmsCount >= this._films.length) {
        remove(this._showMoreButtonComponent);
      }
    };

    this._showMoreButtonComponent.setClickHandler(buttonClickHandler);
  }

  _renderCards(container, films) {
    return films.map((film) => {
      const filmController = new MovieController(container, this._onDataChange, this._onViewChange);
      const commentsOfFilm = this._comments.find((comment) => film.id === comment.id);
      filmController.render(film, commentsOfFilm);

      return filmController;
    });
  }

  _onDataChange(oldCard, newCard) {
    const index = this._films.findIndex((it) => it === oldCard);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newCard, this._films.slice(index + 1));

    this._showedFilmsControllers.forEach((it) => {
      if (it.card === oldCard) {
        const commentsOfFilm = this._comments.find((comment) => newCard.id === comment.id);
        it.render(newCard, commentsOfFilm);
      }
    });

    this._showedExtraFilmsControllers.forEach((it) => {
      if (it.card === oldCard) {
        const commentsOfFilm = this._comments.find((comment) => newCard.id === comment.id);
        it.render(newCard, commentsOfFilm);
      }
    });
  }

  _onViewChange() {
    this._showedFilmsControllers.forEach((it) => it.setDefaultView());
    this._showedExtraFilmsControllers.forEach((it) => it.setDefaultView());
  }

  _getSortedFilms(films, sortType, from, to) {
    let sortedFilms = [];
    const filmsToSort = [...films];

    switch (sortType) {
      case SortType.DEFAULT:
        sortedFilms = filmsToSort;
        break;
      case SortType.BY_RATING:
        sortedFilms = filmsToSort.sort((a, b) => b.rating - a.rating);
        break;
      case SortType.BY_COMMENTS:
        const commentsToSort = [...this._comments];
        const sortedComments = commentsToSort.sort((a, b) => b.length - a.length);
        sortedFilms = sortedComments.map((comment) => {
          return filmsToSort.find((film) => film.id === comment.id);
        });
        break;
      case SortType.BY_DATE:
        sortedFilms = filmsToSort.sort((a, b) => b.releaseDate - a.releaseDate);
        break;
    }

    return sortedFilms.slice(from, to);
  }
}
