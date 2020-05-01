import {FilterType} from "../utils/consts.js";

export const getAddedToWatchlistFilms = (films) => {
  return films.filter((film) => film.isAddedToWatchlist);
};

export const getWatchedFilms = (films) => {
  return films.filter((film) => film.isWatched);
};

export const getFavouriteFilms = (films) => {
  return films.filter((film) => film.isFavourite);
};

export const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return films;
    case FilterType.WATCHLIST:
      return getAddedToWatchlistFilms(films);
    case FilterType.HISTORY:
      return getWatchedFilms(films);
    case FilterType.FAVOURITES:
      return getFavouriteFilms(films);
  }

  return films;
};
