import AbstractComponent from "./abstract-component.js";

const createShowMoreButtonTemplate = () => `<button class="films-list__show-more">Show more</button>`;

export default class ShowMoreButton extends AbstractComponent {
  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  removeClickHandler(handler) {
    this.getElement().removeEventListener(`click`, handler);
  }
}
