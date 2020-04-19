import {FilmsCount, RenderPosition} from "./utils/consts.js";
import {render} from "./utils/render.js";
import {generateCards} from "./mock/card.js";
import {createFilters} from "./mock/filter.js";

import AllFilmsComponent from "./components/films.js";
import NavigationComponent from "./components/navigation.js";
import FilterComponent from "./components/filter.js";
import RatingComponent from "./components/rating.js";
import StatisticsComponent from "./components/statistics.js";
import SortingComponent from "./components/sorting.js";
import PageController from "./controllers/page.js";
import { generateComments } from "./mock/comment.js";

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);

// отрисовываем звание пользователя
render(siteHeaderElement, new RatingComponent());

// отрисовываем навигацию (фильтры и статистику)
const filters = createFilters();
const navigationComponent = new NavigationComponent();

render(siteMainElement, navigationComponent);
render(navigationComponent.getElement(), new FilterComponent(filters), RenderPosition.AFTEREEND);

// отрисовываем сортировку
render(siteMainElement, new SortingComponent());

//отрисовываем фильмы
const films = generateCards(FilmsCount.FILMS_COUNT);
const comments = generateComments(FilmsCount.FILMS_COUNT);
const filmsContainerComponent = new AllFilmsComponent();

render(siteMainElement, filmsContainerComponent);
const pageController = new PageController(filmsContainerComponent);
pageController.render(films, comments);


// отрисовываем секции с экстра - фильмами
pageController.renderExtra(films, comments);

//отрисовываем страницу со статистикой
render(siteMainElement, new StatisticsComponent());
