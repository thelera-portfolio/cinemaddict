import AllFilmsComponent from "./components/films.js";
import API from "./api/index.js";
import FilmsLoadingComponent from "./components/films-loading.js";
import FilmsModel from "./models/movies.js";
import FilterController from "./controllers/filter.js";
import FooterStatistics from "./components/footer-statistics.js";
import NavigationComponent from "./components/navigation.js";
import PageController from "./controllers/page.js";
import Provider from "./api/provider.js";
import RatingComponent from "./components/rating.js";
import StatisticsComponent from "./components/statistics.js";
import Store from "./api/store.js";
import {AUTHORIZATION, END_POINT, MenuItem, StoreInfo} from "./utils/consts.js";
import {ExtraFilm} from "./controllers/page.js";
import {render, remove} from "./utils/render.js";

const STORE_NAME = `${StoreInfo.PREFIX}-${StoreInfo.FILMS_VERSION}`;

const siteFooterElement = document.querySelector(`.footer`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const api = new API(AUTHORIZATION, END_POINT);
const filmsModel = new FilmsModel();
const filmsStore = new Store(StoreInfo.NAME, window.localStorage);
const apiWithProvider = new Provider(api, filmsStore);

const filmsContainerComponent = new AllFilmsComponent();
const filmsLoadingComponent = new FilmsLoadingComponent();
const footerStatisticsComponent = new FooterStatistics(filmsModel);
const navigationComponent = new NavigationComponent();
const ratingComponent = new RatingComponent(filmsModel);
const statisticsComponent = new StatisticsComponent(filmsModel);

const filtersController = new FilterController(navigationComponent, filmsModel);
const pageController = new PageController(filmsContainerComponent, filmsModel, apiWithProvider);

render(siteHeaderElement, ratingComponent);
render(siteMainElement, filmsLoadingComponent);
render(siteFooterElement, footerStatisticsComponent);

navigationComponent.setOnChangeHandler((menuItem) => {
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

apiWithProvider.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    ratingComponent.rerender();
    footerStatisticsComponent.rerender();
    render(siteMainElement, navigationComponent);
    pageController.render();
    pageController.renderExtraFilms(ExtraFilm.RATING);
    pageController.renderExtraFilms(ExtraFilm.COMMENT);
    filtersController.render();
    
    render(siteMainElement, statisticsComponent);
    statisticsComponent.hide();
    
  })
  .catch((err) => {
    throw new Error(err);
  });

window.addEventListener(`load`, () => {
  remove(filmsLoadingComponent);

  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
      // Действие, в случае успешной регистрации ServiceWorker
    }).catch((err) => {
      console.log(err);
    });
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);

  apiWithProvider.sync();
});

window.addEventListener(`offline`, (evt) => {
  document.title += ` [offline]`;
});
  