import AbstractComponent from "./abstract-component.js";

const createMainFilmListTemplate = () =>
  `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  </section>`;

export default class FilmsList extends AbstractComponent {
  getTemplate() {
    return createMainFilmListTemplate();
  }
}

