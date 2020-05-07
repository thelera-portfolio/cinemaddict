import AbstractComponent from "./abstract-component.js";
import {FilterType} from "../utils/consts.js";

const createFilterMarkup = (filter) => {
  const {name, count, isChecked} = filter;
  return (
    `<a href="#${name}" class="main-navigation__item ${isChecked ? `main-navigation__item--active` : ``}" id="control__filters">${name} ${isChecked ? `` : `<span class="main-navigation__item-count">${count}</span>`}</a>`
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
      handler(this._currentFilterType.split(` `)[0]);

      this._setActiveElement(this._currentFilterType);
    });
  }

  _setActiveElement(filterType) {
    const elements = this.getElement().querySelectorAll(`.main-navigation__item`);
    const activeElement = Array.from(elements).find((element) => element.textContent === filterType);

    const currentElement = this.getElement().querySelector(`.main-navigation__item--active`);

    currentElement.classList.remove(`main-navigation__item--active`);
    activeElement.classList.add(`main-navigation__item--active`);
  }
}
