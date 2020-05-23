const AUTHORIZATION = `Basic dXNlchjuhuyi===kBwYXNzd29yZAo=`;
const BAR_HEIGHT = 50;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;
const HIDDEN = `visually-hidden`;
const MAX_DESCRIPTION_LENGTH = 139;
const SHAKE_ANIMATION_TIMEOUT = 1000;

const Button = {
  ESCAPE: `Escape`,
  ENTER: `Enter`,
  DELETE: `Delete`,
  DELETING: `Deleting`,
};

const CardButton = {
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

const emotions = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`,
];

const ErrorMessage = {
  CONNECTION: `No internet connection`,
  CONSTRUCTOR: `Can't instantiate AbstractComponent, only concrete one.`,
  getNotImplemented: (method) => `Abstract method is not implemented: ${method}`,
  SYNCHRONIZATION: `Sync data failed`,
};

const FilmControl = {
  WATCHLIST: `isAddedToWatchlist`,
  WATCH: `isWatched`,
  FAVOURITE: `isFavourite`,
};

const FilterType = {
  ALL: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVOURITES: `Favorites`,
};

const genres = [
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

const MenuItem = {
  FILTERS: `control__filters`,
  STATISTICS: `control__statistics`,
};

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const pageViewSettings = {
  filmsCount: 20,
  extraFilmsCount: 2,
  showingFilmsCountOnStart: 5,
  showingFilmsCountByButton: 5,
};

const PopupButton = {
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

const Rank = {
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

const RenderPosition = {
  BEFOREEND: `beforeend`,
  AFTERBEGIN: `afterbegin`,
  BEFORE: `before`,
};

const SortType = {
  DEFAULT: `default`,
  BY_DATE: `date`,
  BY_RATING: `rating`,
  BY_COMMENTS: `comments`,
};

const StatsData = {
  MAX_WATCHED_COUNT: 100,
  MAX_HOURS_DURATION: 100
};

const StatusCode = {
  SUCCESS: 200,
  REDIRECTION: 300,
};

const StoreInfo = {
  PREFIX: `cinemaddict-localstorage`,
  VERSION: `films`,
};

const TimeFilter = {
  ALLTIME: {
    name: `All time`,
    label: `all-time`,
  },
  TODAY: {
    name: `Today`,
    label: `today`,
  },
  WEEK: {
    name: `Week`,
    label: `week`,
  },
  MONTH: {
    name: `Month`,
    label: `month`,
  },
  YEAR: {
    name: `Year`,
    label: `year`,
  },
};

const Url = {
  MOVIES: `movies`,
  COMMENTS: `comments`,
};

export {AUTHORIZATION, BAR_HEIGHT, END_POINT, HIDDEN, MAX_DESCRIPTION_LENGTH,
  SHAKE_ANIMATION_TIMEOUT, Button, CardButton,
  ErrorMessage, emotions, FilmControl, FilterType, genres, MenuItem, Method, pageViewSettings,
  PopupButton, Rank, RenderPosition, SortType, StatsData, StatusCode, StoreInfo, TimeFilter, Url};
