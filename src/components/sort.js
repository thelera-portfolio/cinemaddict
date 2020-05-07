import AbstractComponent from "./abstract-component.js";
import {SortType} from "../utils/consts.js";

const createSortingTemplate = () =>
  `<ul class="sort">
    <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" data-sort-type="${SortType.BY_DATE}" class="sort__button">Sort by date</a></li>
    <li><a href="#" data-sort-type="${SortType.BY_RATING}" class="sort__button">Sort by rating</a></li>
  </ul>`;

export default class Sorting extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortingTemplate();
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      console.log(`${this._currentSortType}`);
      if (this._currentSortType === sortType) {
        return;
      }

      this.setActiveElement(sortType);

      handler(this._currentSortType);
    });
  }

  setActiveElement(sortType) {
    const currentElement = this.getElement().querySelector(`[data-sort-type=${this._currentSortType}]`);
    const activeElement = this.getElement().querySelector(`[data-sort-type=${sortType}]`);
    currentElement.classList.remove(`sort__button--active`);
    activeElement.classList.add(`sort__button--active`);

    this._currentSortType = sortType;
  }
}
