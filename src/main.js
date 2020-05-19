import AllFilmsComponent from "./components/films.js";
import API from "./api/index.js";
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
import {render} from "./utils/render.js";

const STORE_FILMS_NAME = `${StoreInfo.PREFIX}-${StoreInfo.FILMS_VERSION}`;
const STORE_COMMENTS_NAME = `${StoreInfo.PREFIX}-${StoreInfo.COMMENTS_VERSION}`;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const api = new API(AUTHORIZATION, END_POINT);
const filmsStore = new Store(STORE_FILMS_NAME, window.localStorage);
const commentsStore = new Store(STORE_COMMENTS_NAME, window.localStorage);
const apiWithProvider = new Provider(api, filmsStore, commentsStore);
const filmsModel = new FilmsModel();

const navigationComponent = new NavigationComponent();
const filmsContainerComponent = new AllFilmsComponent();
const statisticsComponent = new StatisticsComponent(filmsModel);
const ratingComponent = new RatingComponent(filmsModel);
//const footerStatisticsComponent = new FooterStatistics();

const filtersController = new FilterController(navigationComponent, filmsModel);
const pageController = new PageController(filmsContainerComponent, filmsModel, apiWithProvider);

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

apiWithProvider.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);

    pageController.render();
    pageController.renderExtraFilms();
    filtersController.render();
    render(siteHeaderElement, ratingComponent);
    render(siteMainElement, statisticsComponent);
    statisticsComponent.hide();
    render(siteFooterElement, new FooterStatistics(films.length));
  })
  .catch((err) => {
    throw new Error(err);
  });

window.addEventListener(`load`, () => {
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
  