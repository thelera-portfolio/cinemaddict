export const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];

export const RANKS = [
  `Novice`,
  `Fan`,
  `Movie Buff`
];

export const StatsData = {
  MAX_WATCHED_COUNT: 100,
  MAX_HOURS_DURATION: 100
};

export const RenderPosition = {
  BEFOREEND: `beforeend`,
  AFTERBEGIN: `afterbegin`,
  BEFORE: `before`,
};

export const ESC_BUTTON = `Escape`;

export const PAGE_VIEW_SETTINGS = {
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

export const Emotions = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`,
];

export const SortType = {
  DEFAULT: `default`,
  BY_DATE: `date`,
  BY_RATING: `rating`,
  BY_COMMENTS: `comments`,
};

export const Buttons = {
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

export const PopupButtons = {
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

export const FilterType = {
  ALL: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVOURITES: `Favorites`,
};

