import {ESC_BUTTON, COMMENTS_TO_SHOW, FilmsCount, RenderPosition} from "./utils/consts.js";
import {render, remove} from "./utils/render.js";
import {generateCards} from "./mock/card.js";
import {createFilters} from "./mock/filter.js";
import {generateComments } from "./mock/comment.js";
import FilmCardComponent from "./components/card.js";
import ExtraFilmComponent from "./components/extra-films.js";
import MainFilmListComponent from "./components/films-list.js";
import AllFilmsComponent from "./components/films.js";
import NavigationComponent from "./components/navigation.js";
import FilterComponent from "./components/filter.js";
import RatingComponent from "./components/rating.js";
import ShowMoreButtonComponent from "./components/show-more-button.js";
import StatisticsComponent from "./components/statistics.js";
import SortingComponent from "./components/sorting.js";
import DetailsPopupComponent from "./components/details-popup.js";
import CommentsComponent from "./components/comment.js";
import NoFilmsComponent from "./components/no-films.js";

const showComments = (containerElement, comments) => {
  const commentsToShow = COMMENTS_TO_SHOW <= comments.length ? COMMENTS_TO_SHOW : comments.length;
  for (let i = 0; i < commentsToShow; i++) {
    render(containerElement, new CommentsComponent(comments[i]));
  }
};

const renderCard = (filmsListContainerElement, card) => {
  const comments = generateComments();

  const cardComponent = new FilmCardComponent(card, comments.length);
  const popupComponent = new DetailsPopupComponent(card, comments.length);

  const commentsList = popupComponent.getElement().querySelector(`.film-details__comments-list`);
  showComments(commentsList, comments);

  const siteBodyElement = document.querySelector(`body`);

  const escKeyDownHandler = (evt) => {
    if (evt.key === ESC_BUTTON) {
      remove(popupComponent);
      document.removeEventListener(`keydown`, escKeyDownHandler);
    }
  };

  const closeButtonClickHandler = () => {
    remove(popupComponent);
    document.removeEventListener(`keydown`, escKeyDownHandler);
  }

  const cardClickHandler = (evt) => {
      render(siteBodyElement, popupComponent);

      popupComponent.setCloseButtonClickHandler(closeButtonClickHandler);

      document.addEventListener(`keydown`, escKeyDownHandler);
  };

  render(filmsListContainerElement, cardComponent);

  cardComponent.setClickHandler(cardClickHandler);
};

const renderFilms = (filmsContainerElement, films) => {
  if (FilmsCount.FILMS_COUNT === 0) {
    render(filmsContainerElement, new NoFilmsComponent());
    return;
  }

  const filmsListContainerElement = filmsContainerElement.querySelector(`.films-list__container`);

  const showingFilmsCount = FilmsCount.SHOWING_FILMS_COUNT_ON_START;
  films.slice(0, showingFilmsCount).forEach((it) => renderCard(filmsListContainerElement, it));

  const showMoreButtonComponent = new ShowMoreButtonComponent();
  render(filmsContainerElement, showMoreButtonComponent);

  let previousFilmsCount = showingFilmsCount;
  showMoreButtonComponent.setClickHandler(() => {
    films.slice(previousFilmsCount, previousFilmsCount + FilmsCount.SHOWING_FILMS_COUNT_BY_BUTTON).forEach((it) => renderCard(filmsListContainerElement, it));
    previousFilmsCount += FilmsCount.SHOWING_FILMS_COUNT_BY_BUTTON;
    if (previousFilmsCount >= films.length) {
      remove(showMoreButtonComponent);
    }
  });
};

const renderExtraFilms = (filmsContainerElement, films) => {
  const filmsListContainerElement = filmsContainerElement.querySelector(`.films-list__container`);

  for (let i = 0; i < FilmsCount.EXTRA_FILMS_COUNT; i++) {
    renderCard(filmsListContainerElement, films[i]);
  }
}

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

// отрисовываем фильмы
const films = generateCards(FilmsCount.FILMS_COUNT);
const filmsContainerComponent = new AllFilmsComponent();
const filmsListComponent = new MainFilmListComponent();
render(siteMainElement, filmsContainerComponent);
render(filmsContainerComponent.getElement(), filmsListComponent);

renderFilms(filmsListComponent.getElement(), films);

// отрисовываем секции с экстра-фильмами
const extraFilms = ['Top rated', 'Most commented'];
extraFilms.forEach(title => {
  const extraFilmsListComponent = new ExtraFilmComponent(title);
  render(filmsContainerComponent.getElement(), extraFilmsListComponent);
  renderExtraFilms(extraFilmsListComponent.getElement(), films);
});

//отрисовываем страницу со статистикой
render(siteMainElement, new StatisticsComponent());
