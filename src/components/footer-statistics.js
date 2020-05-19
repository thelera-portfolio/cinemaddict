import AbstractComponent from "./abstract-component.js";

const createFooterStatisticsTemplate = (filmsCount) => `<section class="footer__statistics">${filmsCount}</section>`;

export default class FooterStatistics extends AbstractComponent {
  constructor(allFilmsCount) {
    super();
    this._filmsCount = allFilmsCount;
  }
  getTemplate() {
    return createFooterStatisticsTemplate(this._filmsCount);
  }
}
