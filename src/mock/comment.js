import {getRandomIntegerNumber, getRandomDate, getRandomArrayItem} from "../utils/common.js";

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
    id: String(new Date() + Math.random()),
    author: getRandomArrayItem(commentsData.authors),
    date: getRandomDate(new Date(2020, 0, 1)),
    emotion: getRandomArrayItem(commentsData.emotions),
    message: getRandomArrayItem(commentsData.messages),
  };
};

const generateOneFilmComments = () => {
  const commentsCount = getRandomIntegerNumber(0, commentsData.maxCommentCount);
  return new Array(commentsCount).fill(``).map(() => generateComment());
};

export const generateComments = (filmsCount) => {
  return new Array(filmsCount).fill(``).map(() => generateOneFilmComments());
};
