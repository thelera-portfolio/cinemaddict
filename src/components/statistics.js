// страница со статистикой
import AbstractSmartComponent from "./abstract-smart-component.js";
import {getFilmsByFilter} from "../utils/filter.js";
import {FilterType} from "../utils/consts.js";
import {getUserRank} from "./rating.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const getCountedGenres = (films) => {
  const favouriteFilms = getFilmsByFilter(films, FilterType.FAVOURITES);

  const values = GENRES.map((genre) =>
    favouriteFilms.filter((film) =>
      film.genres.includes(genre))
        .length);

  let genresCount = [];
  GENRES.forEach((genre, i) => genresCount.push(
      {
        name: genre,
        count: values[i],
      }));

  const sortedGenresCount = genresCount.sort((a, b) => b.count - a.count);

  return sortedGenresCount;
};


const GENRES = [
  `Action`,
  `Adventure`,
  `Animation`,
  `Comedy`,
  `Drama`,
  `Family`,
  `Horror`,
  `Sci-Fi`,
  `Thriller`,
];

const getTopGenre = (films) => getCountedGenres(films)[0].name;

const renderChart = (films, statisticCtx) => {
  const BAR_HEIGHT = 50;

  // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
  statisticCtx.height = BAR_HEIGHT * 9;

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

const createStatisticsTemplate = (films) => {
  const watchedCount = films.filter((film) => film.controls.isWatched).length;

  const duration = films.reduce((filmsDuration, film) => {
    filmsDuration += film.duration;
    return filmsDuration;
  }, 0);

  const durationHours = Math.floor(duration / 60);
  const durationMinutes = duration % 60;

  const topGenre = getTopGenre(films);

  const rank = getUserRank(watchedCount);

  return (
    `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${rank}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${watchedCount} <span class="statistic__item-description">movies</span></p>
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

export default class Statistics extends AbstractSmartComponent {
  constructor(filmsModel) {
    super();

    this._filmsModel = filmsModel;
    this._renderCharts();
  }

  getTemplate() {
    return createStatisticsTemplate(this._filmsModel.getFilms());
  }

  show() {
    super.show();

    this.rerender();
  }

  recoveryListeners() { }

  rerender() {
    super.rerender();

    this._renderCharts();
  }

  _renderCharts() {
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);
    renderChart(this._filmsModel.getFilms(), statisticCtx);
  }
}

