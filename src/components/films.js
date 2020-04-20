// раздел с фильмами
import AbstractComponent from "./abstract-component.js";

const createAllFilmsTemplate = () =>
  `<section class="films">
  </section>`;

export default class Films extends AbstractComponent {
  getTemplate() {
    return createAllFilmsTemplate();
  }
}
