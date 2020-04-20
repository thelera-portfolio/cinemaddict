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

// отрисовываем звание пользователя
render(siteHeaderElement, new RatingComponent());

// отрисовываем навигацию (фильтры и статистику)
const filters = createFilters();
const navigationComponent = new NavigationComponent();

render(siteMainElement, navigationComponent);
render(navigationComponent.getElement(), new FilterComponent(filters), RenderPosition.AFTERBEGIN);

// отрисовываем фильмы
const filmsContainerComponent = new AllFilmsComponent();
const pageController = new PageController(filmsContainerComponent);
pageController.renderFilms(films, comments);
pageController.renderExtraFilms(films, comments);

//отрисовываем страницу со статистикой
//render(siteMainElement, new StatisticsComponent());
