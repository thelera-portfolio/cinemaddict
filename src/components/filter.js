import AbstractComponent from "./abstract-component.js";
import {FilterType} from "../utils/consts.js";

const createFilterMarkup = (filter) => {
  const {name, count, isChecked} = filter;
  return (
    `<a href="#${name}" class="main-navigation__item ${isChecked ? `main-navigation__item--active` : ``}" id="control__filters">${name} ${name === FilterType.ALL ? `` : `<span class="main-navigation__item-count">${count}</span>`}</a>`
  );
};

const createFiltersTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => createFilterMarkup(it)).join(`\n`);
  return (
    `<div class="main-navigation__items">
      ${filtersMarkup}
    </div>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;

    this._currentFilterType = FilterType.ALL;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      this._currentFilterType = evt.target.textContent;
      handler(this._currentFilterType.split(/\d/, 1)[0].slice(0, -1));
    });
  }
}
