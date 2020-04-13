const createFilterMarkup = (filter, isActive) => {
  const {name, count} = filter;
  return (
    `<a href="#${name}" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">${name} ${isActive ? `` : `<span class="main-navigation__item-count">${count}</span>`}</a>`
  );
};

export const createFiltersTemplate = (filters) => {
  const filtersMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);
  return filtersMarkup;
};
