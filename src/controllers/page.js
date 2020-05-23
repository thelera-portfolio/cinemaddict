import ExtraFilmComponent from "../components/extra-films.js";
import FilmListComponent from "../components/films-list.js";
import FilmListContainerComponent from "../components/film-list-container.js";
import MovieController from "./movie.js";
import NoFilmsComponent from "../components/no-films.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import SortComponent from "../components/sort.js";
import {pageViewSettings, RenderPosition, SortType} from "../utils/consts.js";
import {remove, render} from "../utils/render.js";
import moment from "moment";

export const ExtraFilm = {
  RATING: {
    title: `Top rated`,
    sortType: `rating`,
    container: null,
    component: null,
  },
  COMMENT: {
    title: `Most commented`,
    sortType: `comments`,
    container: null,
    component: null,
  }
};

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
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  hide() {
    this._sortComponent.hide();
    this._container.hide();
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

  renderExtraFilms(extraFilm) {
    const extraFilmsListComponent = new ExtraFilmComponent(extraFilm.title);
    const filmListContainerComponent = new FilmListContainerComponent();

    render(this._container.getElement(), extraFilmsListComponent);
    render(extraFilmsListComponent.getElement(), filmListContainerComponent);

    extraFilm.container = filmListContainerComponent.getElement();
    extraFilm.component = extraFilmsListComponent;

    const filmsToRender = this._getSortedFilms(this._filmsModel.getFilms(), extraFilm.sortType, 0, pageViewSettings.extraFilmsCount);

    if (filmsToRender.length > 0) {
      const newFilms = this._renderCards(filmListContainerComponent.getElement(), filmsToRender, extraFilm.sortType);
      this._showedExtraFilmsControllers = this._showedExtraFilmsControllers.concat(newFilms);
    } else {
      extraFilmsListComponent.hide();
    }
  }

  show() {
    this._sortComponent.show();
    this._container.show();
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

  _removeExtraFilms(extraFilm) {
    this._showedExtraFilmsControllers.forEach((filmController) => {
      if (filmController.extraType === extraFilm.sortType) {
        filmController.destroy();
      }
    });

    this._showedExtraFilmsControllers = this._showedExtraFilmsControllers.filter((controller) => controller.extraType !== extraFilm.sortType);
  }

  _removeFilms() {
    this._showedFilmsControllers.forEach((filmController) => filmController.destroy());
    this._showedFilmsControllers = [];
  }

  _renderCards(container, films, extraType = null) {
    return films.map((film) => {
      const filmController = new MovieController(container, this._onDataChange, this._onViewChange, this._api, extraType);

      this._renderCard(filmController, film);

      return filmController;
    });
  }

  _renderCard(cardController, card) {
    cardController.render(card);
  }

  _renderFilms(films) {
    const newFilms = this._renderCards(this._filmsListContainerComponent.getElement(), films);
    this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);
  }

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);

    if (this._filmsModel.getFilms().length <= pageViewSettings.showingFilmsCountOnStart || this._filmsModel.getFilms().length === this._showingFilmsCount) {
      return;
    }

    render(this._filmsListComponent.getElement(), this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(this._onLoadMoreButtonClick);
  }

  _updateFilms(count) {
    this._removeFilms();
    remove(this._noFilmsComponent);

    if (this._filmsModel.getFilms().length === 0) {
      render(this._filmsListComponent.getElement(), this._noFilmsComponent);
      this._renderShowMoreButton();
      return;
    }

    const sortedFilms = this._getSortedFilms(this._filmsModel.getFilms(), this._sortComponent.getSortType(), 0, count);
    this._renderFilms(sortedFilms);

    this._renderShowMoreButton();
  }

  _updateExtraFilms(extraFilm) {
    this._removeExtraFilms(extraFilm);

    const filmsToRender = this._getSortedFilms(this._filmsModel.getAllFilms(), extraFilm.sortType, 0, pageViewSettings.extraFilmsCount);

    if (filmsToRender.length > 0) {
      extraFilm.component.show();
      const newFilms = this._renderCards(extraFilm.container, filmsToRender, extraFilm.sortType);
      this._showedExtraFilmsControllers = this._showedExtraFilmsControllers.concat(newFilms);
    } else {
      extraFilm.component.hide();
    }
  }

  _onDataChange(oldCard, newCard) {
    this._api.updateFilm(oldCard.id, newCard)
      .then((newFilmCard) => {
        const isSuccess = this._filmsModel.updateFilm(oldCard.id, newFilmCard);

        if (isSuccess) {
          this._updateFilms(this._showingFilmsCount); // рисуем все карточки заново

          this._updateExtraFilms(ExtraFilm.COMMENT);
          this._updateExtraFilms(ExtraFilm.RATING);
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
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

  _onFilterChange() {
    this._showingFilmsCount = pageViewSettings.showingFilmsCountOnStart;
    this._updateFilms(this._showingFilmsCount);
    this._sortComponent.setActiveElement(SortType.DEFAULT);
  }

  _onSortTypeChange() {
    this._showingFilmsCount = pageViewSettings.showingFilmsCountByButton;

    this._updateFilms(this._showingFilmsCount);
  }

  _onViewChange() {
    this._showedFilmsControllers.forEach((it) => it.setDefaultView());
    this._showedExtraFilmsControllers.forEach((it) => it.setDefaultView());
  }
}
