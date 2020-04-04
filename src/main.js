import {createFilmCardTemplate} from "./components/card.js";
import { createFilmDetailsPopupTemplate } from "./components/details-popup.js";
import { createExtraFilmTemplate } from "./components/extra-films.js";
import { createMainFilmListTemplate } from "./components/films-list.js";
import { createAllFilmsTemplate } from "./components/films.js";
import { createNavigationTemplate } from "./components/navigation.js";
import { createUserProfileRatingTemplate } from "./components/rating.js";
import { createShowMoreButtonTemplate } from "./components/show-more-button.js";
import { createSortingTemplate } from "./components/sorting.js";

const FILMS_AMOUNT = 5;
const EXTRA_FILMS_AMOUNT = 2;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createUserProfileRatingTemplate());
render(siteMainElement, createNavigationTemplate());
render(siteMainElement, createSortingTemplate());
render(siteMainElement, createAllFilmsTemplate());

const filmsContainerElement = siteMainElement.querySelector(`.films`);
render(filmsContainerElement, createMainFilmListTemplate());

const filmsListElement = filmsContainerElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);
for (let i = 0; i < FILMS_AMOUNT; i++) {
  render(filmsListContainerElement, createFilmCardTemplate());
}
render(filmsListElement, createShowMoreButtonTemplate());

const siteBodyElement = document.querySelector(`body`);
render(siteBodyElement, createFilmDetailsPopupTemplate());

const extraFilms = ['Top rated', 'Most commented'];
extraFilms.forEach(title => {
  render(filmsContainerElement, createExtraFilmTemplate(title));

  const extraFilmListTitleElements = filmsContainerElement.querySelectorAll(`.films-list__title`);
  for (const element of extraFilmListTitleElements) {
    if (element.textContent === title) {
      const container = element.nextElementSibling;
      for (let i = 0; i < EXTRA_FILMS_AMOUNT; i++) {
        render(container, createFilmCardTemplate());
      }
    }
  }
});
