export const AUTHORIZATION = `Basic dXNlchjuhuyi===kBwYXNzd29yZAo=`;
export const BAR_HEIGHT = 50;
export const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;
export const HIDDEN_CLASS = `visually-hidden`;
export const MAX_DESCRIPTION_LENGTH = 139;
export const SHAKE_ANIMATION_TIMEOUT = 600;

export const StoreInfo = {
  PREFIX: `cinemaddict-localstorage`,
  FILMS_VERSION: `films`,
  COMMENTS_VERSION: `comments`,
};

export const GENRES = [
  `Action`,
  `Adventure`,
  `Animation`,
  `Comedy`,
  `Drama`,
  `Family`,
  `Horror`,
  `Sci-Fi`,
  `Thriller`,
];

export const EMOTIONS = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`,
];

export const Button = {
  ESCAPE: `Escape`,
  ENTER: `Enter`,
  DELETE: `Delete`,
  DELETING: `Deleting`,
};

export const MenuItem = {
  FILTERS: `control__filters`,
  STATISTICS: `control__statistics`,
};

export const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

export const StatusCode = {
  SUCCESS: 200,
  REDIRECTION: 300,
};

export const Rank = {
  NOVICE: {
    name: `Novice`,
    value: 1,
  },
  FAN: {
    name: `Fan`,
    value: 11,
  },
  MOVIE_BUFF: {
    name: `Movie Buff`,
    value: 21,
  },
};

export const StatsData = {
  MAX_WATCHED_COUNT: 100,
  MAX_HOURS_DURATION: 100
};

export const RenderPosition = {
  BEFOREEND: `beforeend`,
  AFTERBEGIN: `afterbegin`,
  BEFORE: `before`,
};

export const pageViewSettings = {
  filmsCount: 20,
  extraFilmsCount: 2,
  showingFilmsCountOnStart: 5,
  showingFilmsCountByButton: 5,
};

export const extraFilms = [
  {
    title: `Top rated`,
    sortType: `rating`,
  },
  {
    title: `Most commented`,
    sortType: `comments`,
  },
];

export const ClassError = {
  CONSTRUCTOR: `Can't instantiate AbstractComponent, only concrete one.`,
  notImplemented: (method) => `Abstract method is not implemented: ${method}`,
};

export const SortType = {
  DEFAULT: `default`,
  BY_DATE: `date`,
  BY_RATING: `rating`,
  BY_COMMENTS: `comments`,
};

export const CardButton = {
  WATCHLIST: {
    name: `add-to-watchlist`,
    label: `Add to watchlist`,
  },
  WATCHED: {
    name: `mark-as-watched`,
    label: `Mark as watched`,
  },
  FAVOURITE: {
    name: `favorite`,
    label: `Mark as favourite`,
  },
};

export const PopupButton = {
  WATCHLIST: {
    name: `watchlist`,
    label: `Add to watchlist`,
  },
  WATCHED: {
    name: `watched`,
    label: `Already watched`,
  },
  FAVOURITE: {
    name: `favorite`,
    label: `Add to favourites`,
  },
};

export const FilmControl = {
  WATCHLIST: `isAddedToWatchlist`,
  WATCH: `isWatched`,
  FAVOURITE: `isFavourite`,
};

export const FilterType = {
  ALL: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVOURITES: `Favorites`,
};

export const TimeFilter = {
  ALLTIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`,
};

export const Url = {
  MOVIES: `movies`,
  COMMENTS: `comments`,
};
