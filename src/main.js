import {FilmsCount, RenderPosition} from "./utils/consts.js";
import {render} from "./utils/render.js";
import {generateCards} from "./mock/card.js";
import {createFilters} from "./mock/filter.js";
import {generateComments} from "./mock/comment.js";
import AllFilmsComponent from "./components/films.js";
import NavigationComponent from "./components/navigation.js";
import FilterComponent from "./components/filter.js";
import RatingComponent from "./components/rating.js";
import StatisticsComponent from "./components/statistics.js";
import SortComponent, { SortType } from "./components/sort.js";
import PageController from "./controllers/page.js";

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);

const films = generateCards(FilmsCount.FILMS_COUNT);
const comments = generateComments(FilmsCount.FILMS_COUNT);

const sortFilms = (films, sortType) => {
  let sortedFilms = [];
  const filmsToSort = [...films];

  switch (sortType) {
    case SortType.DEFAULT:
      sortedFilms = filmsToSort;
      break;
    case SortType.BY_RATING:
      sortedFilms = filmsToSort.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.BY_DATE:
      sortedFilms = filmsToSort.sort((a, b) => b.releaseDate - a.releaseDate);
      break;
  }

  return sortedFilms;
};

// отрисовываем звание пользователя
render(siteHeaderElement, new RatingComponent());

// отрисовываем навигацию (фильтры и статистику)
const filters = createFilters();
const navigationComponent = new NavigationComponent();

render(siteMainElement, navigationComponent);
render(navigationComponent.getElement(), new FilterComponent(filters), RenderPosition.AFTERBEGIN);

// отрисовываем сортировку
const sortComponent = new SortComponent();
const filmsContainerComponent = new AllFilmsComponent();
const pageController = new PageController(filmsContainerComponent);

render(siteMainElement, sortComponent);
sortComponent.setSortTypeChangeHandler((sortType) => {
  const sortedFilms = sortFilms(films, sortType);
  pageController.clearFilmList();
  pageController.renderFilms(sortedFilms, comments);
});

//отрисовываем фильмы
render(siteMainElement, filmsContainerComponent);

pageController.renderFilms(films, comments);


// отрисовываем секции с экстра - фильмами
pageController.renderExtraFilms(films, comments);

//отрисовываем страницу со статистикой
render(siteMainElement, new StatisticsComponent());
