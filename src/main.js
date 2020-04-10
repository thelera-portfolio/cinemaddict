import {createFilmCardTemplate} from "./components/card.js";
import { createFilmDetailsPopupTemplate } from "./components/details-popup.js";
import { createExtraFilmTemplate } from "./components/extra-films.js";
import { createMainFilmListTemplate } from "./components/films-list.js";
import { createAllFilmsTemplate } from "./components/films.js";
import { createNavigationTemplate } from "./components/navigation.js";
import { createUserProfileRatingTemplate } from "./components/rating.js";
import { createShowMoreButtonTemplate } from "./components/show-more-button.js";
import { createSortingTemplate } from "./components/sorting.js";
import { generateCards } from "./mock/card.js";

const FILMS_COUNT = 22;
const EXTRA_FILMS_COUNT = 2;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createUserProfileRatingTemplate());
render(siteMainElement, createNavigationTemplate());
render(siteMainElement, createSortingTemplate());
render(siteMainElement, createAllFilmsTemplate());

//отрисовываем фильмы
const filmsContainerElement = siteMainElement.querySelector(`.films`);
render(filmsContainerElement, createMainFilmListTemplate());

const filmsListElement = filmsContainerElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

const films = generateCards(FILMS_COUNT);
const showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
films.slice(0, showingFilmsCount).forEach((it) => render(filmsListContainerElement, createFilmCardTemplate(it)));

render(filmsListElement, createShowMoreButtonTemplate());

let previousFilmsCount = showingFilmsCount;
const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);
showMoreButton.addEventListener(`click`, () => {
  films.slice(previousFilmsCount, previousFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON).forEach((it) => render(filmsListContainerElement, createFilmCardTemplate(it)));
  previousFilmsCount += SHOWING_FILMS_COUNT_BY_BUTTON;
  if (previousFilmsCount >= films.length) {
    showMoreButton.remove();
  }
});

const extraFilms = ['Top rated', 'Most commented'];
extraFilms.forEach(title => {
  render(filmsContainerElement, createExtraFilmTemplate(title));

  const extraFilmListTitleElements = filmsContainerElement.querySelectorAll(`.films-list__title`);
  for (const element of extraFilmListTitleElements) {
    if (element.textContent === title) {
      const container = element.nextElementSibling;
      for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
        render(container, createFilmCardTemplate(films[i]));
      }
    }
  }
});

// отрисовываем поп-ап
const siteBodyElement = document.querySelector(`body`);
render(siteBodyElement, createFilmDetailsPopupTemplate(films[0]));
