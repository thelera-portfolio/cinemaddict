// основной список фильмов
import AbstractComponent from "./abstract-component.js";

const createFilmListContainerTemplate = () =>
  `<div class="films-list__container">
    </div>`;

export default class FilmsList extends AbstractComponent {
  getTemplate() {
    return createFilmListContainerTemplate();
  }
}

