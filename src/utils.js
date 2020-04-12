// export const getRandomDate = () => {
//   const targetDate = new Date();
//   targetDate.setTime(targetDate.getTime() - Math.random() * targetDate.getTime());

//   return targetDate;
// };

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
  return (Math.random() * (max + 1)).toFixed(1);
};

export const formatDate = (date) => {
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours() < 10 ? `0${date.getHours() + 1}` : date.getHours() + 1;
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes() + 1}` : date.getMinutes() + 1;

  return { day, month, year, hours, minutes };
}