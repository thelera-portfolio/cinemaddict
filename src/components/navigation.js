import AbstractComponent from "./abstract-component.js";

const createNavigationTemplate = () =>
  `<nav class="main-navigation">
    <a href="#stats" class="main-navigation__additional" id="control__statistics">Stats</a>
  </nav>`;

export default class Navigation extends AbstractComponent {
  getTemplate() {
    return createNavigationTemplate();
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const menuItem = evt.target.id;

      handler(menuItem);
    });
  }
}

