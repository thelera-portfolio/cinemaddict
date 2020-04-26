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
  GET_TEMPLATE: `Abstract method is not implemented: getTemplate`,
};

export const Emotions = {
  SMILE: `smile`,
  SLEEPING: `sleeping`,
  PUKE: `puke`,
  ANGRY: `angry`
};

export const SortType = {
  DEFAULT: `default`,
  BY_DATE: `date`,
  BY_RATING: `rating`,
  BY_COMMENTS: `comments`,
};
