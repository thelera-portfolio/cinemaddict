import {PAGE_VIEW_SETTINGS, RenderPosition} from "./utils/consts.js";
import {render} from "./utils/render.js";
import {generateCards} from "./mock/card.js";
import {generateComments} from "./mock/comment.js";
import AllFilmsComponent from "./components/films.js";
import NavigationComponent from "./components/navigation.js";
import RatingComponent from "./components/rating.js";
import StatisticsComponent from "./components/statistics.js";
import SortComponent, { SortType } from "./components/sort.js";
import PageController from "./controllers/page.js";
import FilmsModel from "./model/movies.js";
import CommentsModel from "./model/comments.js";
import FilterController from "./controllers/filter.js";

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);

export const films = generateCards(PAGE_VIEW_SETTINGS.filmsCount);
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const comments = generateComments(PAGE_VIEW_SETTINGS.filmsCount);
const commentsModel = new CommentsModel();
commentsModel.setComments(comments);

// отрисовываем звание пользователя
render(siteHeaderElement, new RatingComponent());

const navigationComponent = new NavigationComponent();

// отрисовываем статистику
render(siteMainElement, navigationComponent);

// отрисовываем фильтры
const filtersController = new FilterController(navigationComponent, filmsModel);
filtersController.render();

// отрисовываем фильмы
const filmsContainerComponent = new AllFilmsComponent();

const pageController = new PageController(filmsContainerComponent, filmsModel, commentsModel);
pageController.render();
pageController.renderExtraFilms();

//отрисовываем страницу со статистикой
//render(siteMainElement, new StatisticsComponent());
