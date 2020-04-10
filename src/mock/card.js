const filmsInfo = {
  names: [
    `The Dance of Life`,
    `Sagebrush Trail`,
    `The Man with the Golden Arm`,
    `Santa Claus Conquers the Martians`,
    `Popeye the Sailor Meets Sindbad the Sailor`,
  ],
  posters: [
    `./images/posters/made-for-each-other.png`,
    `./images/posters/popeye-meets-sinbad.png`,
    `./images/posters/sagebrush-trail.jpg`,
    `./images/posters/santa-claus-conquers-the-martians.jpg`,
    `./images/posters/the-dance-of-life.jpg`,
    `./images/posters/the-great-flamarion.jpg`,
    `./images/posters/the-man-with-the-golden-arm.jpg`,
  ],
  genres: [
    `Musical`,
    `Western`,
    `Drama`,
    `Comedy`,
    `Cartoon`,
    `Mistery`,
  ],
  description: {
    string: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
    maxLength: 140,
    sentencesCount: 5
  },
  maxFilmRating: 10,
  year: {
    min: 1920,
    max: 2020
  },
  durationInMinutes: {
    min: 30,
    max: 180
  },
  commentsInfo: {
    authors: [`name1`, `name2`, `name3`],
    date: new Date(),
    emotions: [
      `smile`,
      `sleeping`,
      `puke`,
      `angry`
    ],
    messages: [`message`, `message`, `message`],
    maxCommentCount: 5,
  }
};

const getRandomArrayItem = (array) => {
  const arrayIndex = Math.floor(Math.random() * array.length);
  return array[arrayIndex];
};

const getRandomIntegerNumber = (min, max) => { // [min, max]
  return min + Math.floor(Math.random() * ((max + 1) - min));
};

const getRandomFloatNumber = (max) => { // [0, max]
  return (Math.random() * (max + 1)).toFixed(1);
};

const fromMinutesToHours = (timeInMinutes) => {
  const hours = Math.floor(timeInMinutes / 60);
  const minutes = timeInMinutes % 60;

  let time = `${hours}h ${minutes}m`;
  if (hours === 0) {
    time = `${minutes}m`;
  }
  if (minutes === 0) {
    time = `${hours * 60}m`;
  }

  return time;
};

const getFilmDescriptionFromString = (string, sentencesCount, maxDescriptionLength) => {
  const arrayOfStrings = string.split(`. `).map((it) => it.concat('.'));
  let description = ``;
  while (sentencesCount > 0) {
    description += `${getRandomArrayItem(arrayOfStrings)} `;
    sentencesCount--;
  }

  return description.length >= maxDescriptionLength ? `${description.slice(0, maxDescriptionLength)}...` : description;
};

// const generateComment = () => {
//   return {
//     author: getRandomArrayItem(filmsInfo.commentsInfo.authors),
//     date: filmsInfo.commentsInfo.date,
//     emotion: getRandomArrayItem(filmsInfo.commentsInfo.emotions),
//     message: getRandomArrayItem(filmsInfo.commentsInfo.messages),
//   }
// };

export const generateCard = () => {
  return {
    title: getRandomArrayItem(filmsInfo.names),
    rating: getRandomFloatNumber(filmsInfo.maxFilmRating),
    year: getRandomIntegerNumber(filmsInfo.year.min, filmsInfo.year.max),
    duration: fromMinutesToHours(getRandomIntegerNumber(filmsInfo.durationInMinutes.min, filmsInfo.durationInMinutes.max)),
    category: getRandomArrayItem(filmsInfo.genres),
    image: getRandomArrayItem(filmsInfo.posters),
    description: getFilmDescriptionFromString(filmsInfo.description.string, filmsInfo.description.sentencesCount, filmsInfo.description.maxLength),
    commentsCount: getRandomIntegerNumber(0, filmsInfo.commentsInfo.maxCommentCount),
  };
};

export const generateCards = (count) => {
  return new Array(count).fill(``).map((it) => generateCard());
};