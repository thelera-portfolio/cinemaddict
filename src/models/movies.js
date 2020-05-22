import {FilterType} from "../utils/consts.js";
import {getFilmsByFilter} from "../utils/filter.js";

export default class Films {
  constructor() {
    this._films = [];
    this._activeFilterType = FilterType.ALL;

    this._dataChangeHandlers = []; // массив для сбора наблюдателей * observers *
    this._filterChangeHandlers = [];
  }

  getAllFilms() {
    return this._films;
  }

  getFilms() {
    return getFilmsByFilter(this._films, this._activeFilterType);
  }

  setFilms(films) {
    this._films = films;

    // уведомляем подписавшихся на обновления, что модель изменилась
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;

    // уведомляем подписавшихся на обновления, что модель изменилась
    this._callHandlers(this._filterChangeHandlers);
  }

  // подписаться на обновление * addObserver *
  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  updateFilm(id, film) {
    const index = this._films.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));

    // уведомляем подписавшихся на обновления
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  // уведомление наблюдателей * notify *
  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
