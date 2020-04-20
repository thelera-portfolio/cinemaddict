// основное меню (фильтры и статистика)
import AbstractComponent from "./abstract-component.js";

const createNavigationTemplate = () =>
  `<nav class="main-navigation">
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;

export default class Navigation extends AbstractComponent {
  getTemplate() {
    return createNavigationTemplate();
  }
}

