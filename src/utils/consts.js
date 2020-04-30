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
  `Sci-Fighter`,
  `King Of Drama`,
  `Comic`,
  `Cartoon lover`,
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

export const COMMENTS_TO_SHOW = 5;
export const ESC_BUTTON = `Escape`;

export const FilmsCount = {
  FILMS_COUNT: 20,
  EXTRA_FILMS_COUNT: 2,
  SHOWING_FILMS_COUNT_ON_START: 5,
  SHOWING_FILMS_COUNT_BY_BUTTON: 5,
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
  NOT_IMPLEMENTED: (method) => `Abstract method is not implemented: ${method}`,
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

