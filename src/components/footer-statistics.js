import AbstractSmartComponent from "./abstract-smart-component.js";

const createFooterStatisticsTemplate = (filmsCount) => `<section class="footer__statistics">${filmsCount ? filmsCount : `0 movies inside`}</section>`;

export default class FooterStatistics extends AbstractSmartComponent {
  constructor(filmsModel) {
    super();

    this._films = filmsModel;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._films.getFilms().length);
  }

  recoveryListeners() {}
}
