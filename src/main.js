import AllFilmsComponent from "./components/films.js";
import API from "./api.js";
import CommentsModel from "./models/comments.js";
import FilmsModel from "./models/movies.js";
import FilterController from "./controllers/filter.js";
import NavigationComponent from "./components/navigation.js";
import PageController from "./controllers/page.js";
import RatingComponent from "./components/rating.js";
import StatisticsComponent from "./components/statistics.js";
import {render} from "./utils/render.js";

const AUTHORIZATION = `Basic dXNlchjuhuyi===kBwYXNzd29yZAo=`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);

const api = new API(AUTHORIZATION, END_POINT);
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

const ratingComponent = new RatingComponent();
const navigationComponent = new NavigationComponent();
const filmsContainerComponent = new AllFilmsComponent();

const filtersController = new FilterController(navigationComponent, filmsModel);
const pageController = new PageController(filmsContainerComponent, filmsModel, commentsModel, api);

render(siteHeaderElement, ratingComponent);
render(siteMainElement, navigationComponent);
//render(siteMainElement, new StatisticsComponent());



api.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    return films.map((film) => api.getComments(film.id));
  })
  .then((allComments) => Promise.all(allComments))
  .then((comments) => {
    commentsModel.setComments(comments);

    pageController.render();
    pageController.renderExtraFilms();
    filtersController.render();
  });
