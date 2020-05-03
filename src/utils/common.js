import moment from "moment";

export const getRandomDate = (start = new Date(1920, 0, 1), end = new Date()) => {
  return (new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())));
};

export const getRandomArrayItem = (array) => {
  const arrayIndex = Math.floor(Math.random() * array.length);
  return array[arrayIndex];
};

export const getSeveralRandomArrayItems = (number, array) => new Array(getRandomIntegerNumber(1, number)).fill(``).map(() => getRandomArrayItem(array));

// [min, max]
export const getRandomIntegerNumber = (min, max) => (min + Math.floor(Math.random() * ((max + 1) - min)));

// [0, max]
export const getRandomFloatNumber = (max) => ((Math.random() * (max)).toFixed(1));

export const humanizeDate = (date) => {
  return moment(date).startOf(`day`).fromNow();
  // return moment(date).format(`YYYY/MM/DD hh:mm`);
};

export const fromMinutesToHours = (minutes) => {
  return moment(moment.duration(minutes, `minutes`).asMilliseconds()).format(`h[h] mm[m]`);
};
