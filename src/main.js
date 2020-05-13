import AllFilmsComponent from "./components/films.js";
import API from "./api.js";
import FilmsModel from "./models/movies.js";
import FilterController from "./controllers/filter.js";
import NavigationComponent from "./components/navigation.js";
import PageController from "./controllers/page.js";
import RatingComponent from "./components/rating.js";
import StatisticsComponent from "./components/statistics.js";
import {render} from "./utils/render.js";
import {AUTHORIZATION, END_POINT, MenuItem} from "./utils/consts.js";

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);

const api = new API(AUTHORIZATION, END_POINT);
const filmsModel = new FilmsModel();

const navigationComponent = new NavigationComponent();
const filmsContainerComponent = new AllFilmsComponent();
const statisticsComponent = new StatisticsComponent(filmsModel);
const ratingComponent = new RatingComponent(filmsModel);

const filtersController = new FilterController(navigationComponent, filmsModel);
const pageController = new PageController(filmsContainerComponent, filmsModel, api);

render(siteMainElement, navigationComponent);

navigationComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.FILTERS:
      statisticsComponent.hide();
      pageController.show();
      break;
    case MenuItem.STATISTICS:
      statisticsComponent.show();
      pageController.hide();
      break;
  }
});

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);

    pageController.render();
    pageController.renderExtraFilms();
    filtersController.render();
    render(siteHeaderElement, ratingComponent);
    render(siteMainElement, statisticsComponent);
    statisticsComponent.hide();
  })
  .catch(() => {
    throw new Error(`Error`);
  });
  