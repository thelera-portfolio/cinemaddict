import {extraFilms, pageViewSettings, RenderPosition, SortType} from "../utils/consts.js";
import {remove, render} from "../utils/render.js";
import ExtraFilmComponent from "../components/extra-films.js";
import FilmListComponent from "../components/films-list.js";
import MovieController from "./movie.js";
import NoFilmsComponent from "../components/no-films.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import SortComponent from "../components/sort.js";
import FilmListContainerComponent from "../components/film-list-container.js";
import moment from "moment";

export default class PageController {
  constructor(container, filmsModel, api) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._api = api;

    this._showedFilmsControllers = [];
    this._showedExtraFilmsControllers = [];

    this._showingFilmsCount = pageViewSettings.showingFilmsCountOnStart;

    this._filmsListComponent = new FilmListComponent();
    this._filmsListContainerComponent = new FilmListContainerComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = new SortComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const films = this._filmsModel.getFilms();

    // отрисуем сортировку
    const siteMainElement = document.querySelector(`.main`);
    render(siteMainElement, this._sortComponent);

    // отрисовываем фильмы
    render(siteMainElement, this._container);
    render(this._container.getElement(), this._filmsListComponent, RenderPosition.AFTERBEGIN);
    render(this._filmsListComponent.getElement(), this._filmsListContainerComponent);

    if (this._filmsModel.getFilms().length === 0) {
      render(this._filmsListComponent.getElement(), this._noFilmsComponent);
      return;
    }

    this._renderFilms(films.slice(0, this._showingFilmsCount));
    this._renderShowMoreButton();
  }

  renderExtraFilms() {
    extraFilms.forEach((extraFilm) => {
      const extraFilmsListComponent = new ExtraFilmComponent(extraFilm.title);
      render(this._container.getElement(), extraFilmsListComponent);

      const filmListContainerComponent = new FilmListContainerComponent();
      render(extraFilmsListComponent.getElement(), filmListContainerComponent);

      const filmsToRender = this._getSortedFilms(this._filmsModel.getFilms(), extraFilm.sortType, 0, pageViewSettings.extraFilmsCount);

      const newFilms = this._renderCards(filmListContainerComponent.getElement(), filmsToRender);
      this._showedExtraFilmsControllers = this._showedExtraFilmsControllers.concat(newFilms);
    });
  }

  show() {
    this._sortComponent.show();
    this._container.show();
  }

  hide() {
    this._sortComponent.hide();
    this._container.hide();
  }

  _renderFilms(films) {
    const newFilms = this._renderCards(this._filmsListContainerComponent.getElement(), films);
    this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);
  }

  _removeFilms() {
    this._showedFilmsControllers.forEach((filmController) => filmController.destroy());
    this._showedFilmsControllers = [];
  }

  _updateFilms(count) {
    this._removeFilms();

    if (this._filmsModel.getFilms().length === 0) {
      render(this._filmsListComponent.getElement(), this._noFilmsComponent);
      return;
    }
    this._renderFilms(this._filmsModel.getFilms().slice(0, count));
    this._renderShowMoreButton();
  }

  _onSortTypeChange(sortType) {
    this._showingFilmsCount = pageViewSettings.showingFilmsCountByButton;
    const sortedFilms = this._getSortedFilms(this._filmsModel.getFilms(), sortType, 0, this._showingFilmsCount);

    this._removeFilms();

    this._renderFilms(sortedFilms);
    this._renderShowMoreButton();
  }

  _onFilterChange() {
    this._updateFilms(pageViewSettings.showingFilmsCountOnStart);
    this._sortComponent.setActiveElement(SortType.DEFAULT);
  }

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);
    this._showingFilmsCount = pageViewSettings.showingFilmsCountOnStart;

    if (this._filmsModel.getFilms().length <= pageViewSettings.showingFilmsCountOnStart) {
      return;
    }

    render(this._filmsListComponent.getElement(), this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(this._onLoadMoreButtonClick);
  }

  _onLoadMoreButtonClick() {
    let previousFilmsCount = this._showingFilmsCount;
    this._showingFilmsCount = previousFilmsCount + pageViewSettings.showingFilmsCountByButton;

    const sortedFilms = this._getSortedFilms(this._filmsModel.getFilms(), this._sortComponent.getSortType(), previousFilmsCount, this._showingFilmsCount);

    const newFilms = this._renderCards(this._filmsListContainerComponent.getElement(), sortedFilms);
    this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);

    previousFilmsCount += pageViewSettings.showingFilmsCountByButton;
    if (previousFilmsCount >= this._filmsModel.getFilms().length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderCards(container, films) {
    return films.map((film) => {
      const filmController = new MovieController(container, this._onDataChange, this._onViewChange, this._api);

      this._renderCard(filmController, film);

      return filmController;
    });
  }

  _onDataChange(oldCard, newCard) {
    this._api.updateFilm(oldCard.id, newCard)
      .then((newFilmCard) => {
        const isSuccess = this._filmsModel.updateFilm(oldCard.id, newFilmCard);

        if (isSuccess) {
          this._updateFilms(this._showingFilmsCount); // рисуем все карточки заново

          const oldExtraFilmController = this._showedExtraFilmsControllers.find((it) => it.card === oldCard);
          // обновляем экстра-карточку, если нужно
          if (oldExtraFilmController) {
            this._renderCard(oldExtraFilmController, newFilmCard);
          }
        }
      })
    .catch(() => {
      throw new Error(`Error`);
    });
  }

  _renderCard(cardController, card) {
    cardController.render(card);
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
        sortedFilms = filmsToSort.sort((a, b) => b.commentsIds.length - a.commentsIds.length);
        break;
      case SortType.BY_DATE:
        sortedFilms = filmsToSort.sort((a, b) => moment(b.releaseDate).format(`x`) - moment(a.releaseDate).format(`x`));
        break;
    }

    return sortedFilms.slice(from, to);
  }
}
