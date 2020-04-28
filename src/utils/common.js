export const getRandomDate = (start = new Date(1920, 0, 1), end = new Date()) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const getRandomArrayItem = (array) => {
  const arrayIndex = Math.floor(Math.random() * array.length);
  return array[arrayIndex];
};

export const getSeveralRandomArrayItems = (number, array) => new Array(getRandomIntegerNumber(1, number)).fill(``).map(() => getRandomArrayItem(array));

export const getRandomIntegerNumber = (min, max) => { // [min, max]
  return min + Math.floor(Math.random() * ((max + 1) - min));
};

export const getRandomFloatNumber = (max) => { // [0, max]
  return (Math.random() * (max)).toFixed(1);
};

export const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, `0`);
  const month = String((date.getMonth() + 1)).padStart(2, `0`);
  const year = date.getFullYear();
  const hours = String((date.getHours() + 1)).padStart(2, `0`);
  const minutes = String((date.getMinutes() + 1)).padStart(2, `0`);

  return {day, month, year, hours, minutes};
};

export const getError = (method) => {
  return `Abstract method is not implemented: ${method}`;
};
