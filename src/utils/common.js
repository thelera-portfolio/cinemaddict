import {SHAKE_ANIMATION_TIMEOUT, StatusCode} from "../utils/consts.js";
import moment from "moment";

const checkStatus = (response) => {
  if (response.status >= StatusCode.SUCCESS && response.status < StatusCode.REDIRECTION) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

const fromMinutesToHours = (minutes) => {
  return moment(moment.duration(minutes, `minutes`).asMilliseconds()).format(`h[h] mm[m]`);
};

const getSyncedFilms = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.movie);
};

const getRandomDate = (start = new Date(1920, 0, 1), end = new Date()) => {
  return (new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())));
};

const getRandomArrayItem = (array) => {
  const arrayIndex = Math.floor(Math.random() * array.length);
  return array[arrayIndex];
};

const getSeveralRandomArrayItems = (number, array) => new Array(getRandomIntegerNumber(1, number)).fill(``).map(() => getRandomArrayItem(array));

// [min, max]
const getRandomIntegerNumber = (min, max) => (min + Math.floor(Math.random() * ((max + 1) - min)));

// [0, max]
const getRandomFloatNumber = (max) => ((Math.random() * (max)).toFixed(1));

const humanizeDate = (date) => {
  return moment(date).fromNow();
  // return moment(date).format(`YYYY/MM/DD hh:mm`);
};

const isOnline = () => {
  return window.navigator.onLine;
};

const shake = (element) => {
  element.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

  setTimeout(() => {
    element.style.animation = ``;
  }, SHAKE_ANIMATION_TIMEOUT);
};

export {checkStatus, createStoreStructure, fromMinutesToHours, getSyncedFilms, getRandomDate, getRandomArrayItem,
  getSeveralRandomArrayItems, getRandomIntegerNumber, getRandomFloatNumber, humanizeDate, isOnline, shake};
