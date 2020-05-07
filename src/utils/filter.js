import {FilterType} from "../utils/consts.js";

export const getFilterByProperty = (array, property) => array.filter((item) => item[property]);

export const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return films;
    case FilterType.WATCHLIST:
      return getFilterByProperty(films, `isAddedToWatchlist`);
    case FilterType.HISTORY:
      return getFilterByProperty(films, `isWatched`);
    case FilterType.FAVOURITES:
      return getFilterByProperty(films, `isFavourite`);
  }

  return films;
};
