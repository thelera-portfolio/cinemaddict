import {getRandomDate, getRandomIntegerNumber, getRandomFloatNumber, getRandomArrayItem, getSeveralRandomArrayItems} from "../utils/common.js";

const FilmDataConstant = {
  COUNTRIES: [
    `Argentina`,
    `Australia`,
    `Austria`,
    `Belarus`,
    `Belgium`,
    `Bolivia`,
    `Brazil`,
    `Bulgaria`,
    `Cambodia`,
    `Canada`,
    `Chile`,
    `China`,
    `Colombia`,
    `Cuba`,
    `Czech Republic`,
    `Ethiopia`,
    `Finland`,
    `France`,
    `Georgia`,
    `Germany`,
    `Guatemala`,
    `Hong Kong`,
    `Hungary`,
    `India`,
    `Indonesia`,
    `Iran`,
    `Israel`,
    `Italy`,
    `Japan`,
    `North Korea`,
    `South Korea`,
    `Mexico`,
    `Netherlands`,
    `New Zealand`,
    `Norway`,
    `Peru`,
    `Portugal`,
    `Russia`,
    `Spain`,
    `Sweden`,
    `Switzerland`,
    `Thailand`,
    `Turkey`,
    `Ukraine`,
    `United Kingdom`,
    `United States`,
    `Vietnam`,
  ],
  STRING: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
  DIRECTORS: [
    `Woody Allen`,
    `Robert Altman`,
    `Ingmar Bergman`,
    `Mel Brooks`,
    `Tim Burton`,
    `James Cameron`,
    `Frank Capra`,
    `John Cassavetes`,
    `Charlie Chaplin`,
    `Coen, Joel and Ethan`,
    `Francis Ford Coppola`,
    `George Cukor`,
    `Michael Curtiz`,
  ],
  ACTORS: {
    quantity: 3,
    names: [
      `Jack Nicholson`,
      `Marlon Brando`,
      `Robert De Niro`,
      `Al Pacino`,
      `Daniel Day-Lewis`,
      `Dustin Hoffman`,
      `Tom Hanks`,
      `Anthony Hopkins`,
      `Paul Newman`,
      `Denzel Washington`,
      `Spencer Tracy`,
      `Laurence Olivier`,
      `Jack Lemmon`,
      `Michael Caine`,
      `James Stewart`,
      `Robin Williams`,
      `Robert Duvall`,
    ],
  },
  GENRES: [
    `Musical`,
    `Western`,
    `Drama`,
    `Comedy`,
    `Cartoon`,
    `Mistery`,
  ],
  GENRES_COUNT: 3,
  durationInMinutes: {
    MIN: 30,
    MAX: 180
  },
  NAMES: [
    `The Dance of Life`,
    `Sagebrush Trail`,
    `The Man with the Golden Arm`,
    `Santa Claus Conquers the Martians`,
    `Popeye the Sailor Meets Sindbad the Sailor`,
  ],
  POSTERS: [
    `./images/posters/made-for-each-other.png`,
    `./images/posters/popeye-meets-sinbad.png`,
    `./images/posters/sagebrush-trail.jpg`,
    `./images/posters/santa-claus-conquers-the-martians.jpg`,
    `./images/posters/the-dance-of-life.jpg`,
    `./images/posters/the-great-flamarion.jpg`,
    `./images/posters/the-man-with-the-golden-arm.jpg`,
  ],
  WRITERS: [
    `Billy Wilder`,
    `Ethan Coen and Joel Coen`,
    `Robert Towne`,
    `Quentin Tarantino`,
    `Francis Ford Coppola`,
    `William Goldman`,
    `Charlie Kaufman`,
    `Woody Allen`,
    `Nora Ephron`,
    `Ernest Lehman`,
    `Paul Schrader`,
    `Oliver Stone`,
    `Aaron Sorkin`,
    `Paddy Chayefsky`,
  ],
  Description: {
    MAX_LENGTH: 140,
    SENTENCES_COUNT: 5
  },
  MAX_FILM_RATING: 10,
  WRITERS_COUNT: 3,
};

const filmsData = {
  actors: FilmDataConstant.ACTORS,
  countries: FilmDataConstant.COUNTRIES,
  description: {
    string: FilmDataConstant.STRING,
    maxLength: FilmDataConstant.Description.MAX_LENGTH,
    sentencesCount: FilmDataConstant.Description.SENTENCES_COUNT
  },
  directors: FilmDataConstant.DIRECTORS,
  duration: FilmDataConstant.durationInMinutes,
  genres: {
    quantity: FilmDataConstant.GENRES_COUNT,
    list: FilmDataConstant.GENRES
  },
  maxFilmRating: FilmDataConstant.MAX_FILM_RATING,
  names: FilmDataConstant.NAMES,
  posters: FilmDataConstant.POSTERS,
  writers: {
    quantity: FilmDataConstant.WRITERS_COUNT,
    names: FilmDataConstant.WRITERS
  },
};

export const GENRES = filmsData.genres.list;
export const MAX_DESCRIPTION_LENGTH = FilmDataConstant.Description.MAX_LENGTH;

const getFilmDescriptionFromString = (string, sentencesCount) => {
  const arrayOfStrings = string.split(`. `).map((it) => it.concat(`.`));
  let description = ``;
  while (sentencesCount > 0) {
    description += `${getRandomArrayItem(arrayOfStrings)} `;
    sentencesCount--;
  }

  return description;
};

export const generateCard = () => {
  return {
    actors: getSeveralRandomArrayItems(filmsData.actors.quantity, filmsData.actors.names),
    age: getRandomIntegerNumber(0, 18),
    country: getRandomArrayItem(filmsData.countries),
    description: getFilmDescriptionFromString(filmsData.description.string, filmsData.description.sentencesCount),
    director: getRandomArrayItem(filmsData.directors),
    duration: getRandomIntegerNumber(filmsData.duration.MIN, filmsData.duration.MAX),
    genres: getSeveralRandomArrayItems(filmsData.genres.quantity, filmsData.genres.list),
    id: Math.random().toString(36).substr(2, 9),
    image: getRandomArrayItem(filmsData.posters),
    title: getRandomArrayItem(filmsData.names),
    rating: getRandomFloatNumber(filmsData.maxFilmRating),
    releaseDate: getRandomDate(),
    writers: getSeveralRandomArrayItems(filmsData.writers.quantity, filmsData.writers.names),
    isAddedToWatchlist: Math.random() > 0.5,
    isWatched: Math.random() > 0.5,
    isFavourite: Math.random() > 0.5,
  };
};

export const generateCards = (count) => {
  return new Array(count).fill(``).map(() => generateCard());
};
