import {getRandomIntegerNumber, getRandomDate, getRandomArrayItem} from "../utils/common.js";
import {films} from "../main.js";

export const commentsData = {
  authors: [`Tim Macoveev`, `John Doe`, `Olly Olsen`, `Rusty James`, `Olivia`],
  date: new Date(),
  emotions: [
    `smile`,
    `sleeping`,
    `puke`,
    `angry`
  ],
  messages: [`Interesting setting and a good cast`, `Booooooooooring`, `Very very old. Meh`, `Almost two hours? Seriously?`, `I like that`],
  maxCommentCount: 10,
};

const generateComment = () => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    author: getRandomArrayItem(commentsData.authors),
    date: getRandomDate(new Date(2020, 0, 1)),
    emotion: getRandomArrayItem(commentsData.emotions),
    message: getRandomArrayItem(commentsData.messages),
  };
};

const generateOneFilmComments = (filmIndex) => {
  const commentsCount = getRandomIntegerNumber(0, commentsData.maxCommentCount);
  return {
    filmId: films[filmIndex].id,
    comments: new Array(commentsCount).fill(``).map(() => generateComment()),
  };
};

export const generateComments = (filmsCount) => {
  return new Array(filmsCount).fill(``).map((film, index) => generateOneFilmComments(index));
};
