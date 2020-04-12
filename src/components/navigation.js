// основное меню (фильтры и статистика)
import {createFilters} from "../mock/filter.js";

const filters = createFilters();

const createFiltersTemplate = (filter, isActive) => {
  const {name, count} = filter;
  return (
    `<a href="#${name}" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">${name} ${isActive ? `` : `<span class="main-navigation__item-count">${count}</span>`}</a>`
  );
};

const filtersMarkup = filters.map((it, i) => createFiltersTemplate(it, i === 0)).join(`\n`);

export const createNavigationTemplate = () => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};
