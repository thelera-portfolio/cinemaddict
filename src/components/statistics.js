import AbstractSmartComponent from "./abstract-smart-component.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {BAR_HEIGHT, genres, FilterType, TimeFilter} from "../utils/consts.js";
import {getFilmsByFilter} from "../utils/filter.js";
import {getUserRank} from "./rating.js";
import moment from "moment";

const createFilterMarkup = (filter, isCkecked) => {
  const {name, label} = filter;

  return (
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${label}" value="${label}" ${isCkecked ? `checked` : ``}>
    <label for="statistic-${label}" class="statistic__filters-label for="statistic-${label}">${name}</label>`
  );
};

const createStatisticsTemplate = (films, currentFilter) => {
  const duration = films.reduce((filmsDuration, film) => {
    filmsDuration += film.duration;
    return filmsDuration;
  }, 0);

  let timeFiltersMarkup = ``;
  for (const filter in TimeFilter) {
    if (filter) {
      timeFiltersMarkup = timeFiltersMarkup.concat(createFilterMarkup(TimeFilter[filter], currentFilter === TimeFilter[filter].label));
    }
  }

  const durationHours = Math.floor(duration / 60);
  const durationMinutes = duration % 60;
  const topGenre = films.length > 0 ? getTopGenre(films) : ``;
  const rank = getUserRank(films.length);

  return (
    `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${rank}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      ${timeFiltersMarkup}
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${films.length} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${durationHours} <span class="statistic__item-description">h</span> ${durationMinutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>
  </section>`
  );
};

const getWatchedFilmsByPeriod = (films, period) => {
  const watchedFilms = getFilmsByFilter(films, FilterType.HISTORY);

  if (period === TimeFilter.ALLTIME.label) {
    return watchedFilms;
  }

  const startOfPeriod = moment().startOf(period);

  return watchedFilms.filter((film) => moment(film.watchingDate).isAfter(startOfPeriod));
};

const getCountedGenres = (films) => {
  const values = genres.map((genre) =>
    films.filter((film) =>
      film.genres.includes(genre))
        .length);

  const genresCount = [];
  genres.forEach((genre, i) => genresCount.push(
      {
        name: genre,
        count: values[i],
      }));

  const sortedGenresCount = genresCount.sort((a, b) => b.count - a.count);

  return sortedGenresCount;
};

const getTopGenre = (films) => getCountedGenres(films)[0].name;

const renderChart = (films, statisticCtx) => {
  // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
  statisticCtx.height = BAR_HEIGHT * genres.length;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: getCountedGenres(films).map((genre) => genre.name),
      datasets: [{
        data: getCountedGenres(films).map((genre) => genre.count),
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

export default class Statistics extends AbstractSmartComponent {
  constructor(filmsModel) {
    super();

    this._films = filmsModel;
    this._currentTimeFilter = TimeFilter.ALLTIME.label;
    this._renderCharts();

    this._setTimeFilterHandlers();
  }

  getTemplate() {
    return createStatisticsTemplate(getWatchedFilmsByPeriod(this._films.getAllFilms(), this._currentTimeFilter), this._currentTimeFilter);
  }

  recoveryListeners() {
    this._setTimeFilterHandlers();
  }

  rerender() {
    super.rerender();

    this._renderCharts();
    this.recoveryListeners();
  }

  show() {
    super.show();

    this.rerender();

    this._setTimeFilterHandlers();
  }

  _setTimeFilterHandlers() {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const filterData = evt.target.getAttribute(`for`);

      if (filterData) {
        this._currentTimeFilter = filterData.substring(filterData.length, `statistic-`.length);
      }

      this.rerender();
    });
  }

  _renderCharts() {
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);
    const watchedFilmsByPeriod = getWatchedFilmsByPeriod(this._films.getAllFilms(), this._currentTimeFilter);

    if (watchedFilmsByPeriod.length > 0) {
      renderChart(watchedFilmsByPeriod, statisticCtx, this._currentTimeFilter);
    }
  }
}
