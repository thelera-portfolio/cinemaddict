import {getRandomDate, getRandomArrayItem} from "../utils.js";

const commentsData = {
  authors: [`Tim Macoveev`, `John Doe`, `Olly Olsen`, `Rusty James`, `Olivia`],
  date: new Date(),
  emotions: [
    `smile`,
    `sleeping`,
    `puke`,
    `angry`
  ],
  messages: [`Interesting setting and a good cast`, `Booooooooooring`, `Very very old. Meh`, `Almost two hours? Seriously?`, `I like that`],
  maxCommentCount: 5,
};

const generateComment = () => {
  return {
    author: getRandomArrayItem(commentsData.authors),
    date: getRandomDate(new Date(2020, 0, 1)),
    emotion: getRandomArrayItem(commentsData.emotions),
    message: getRandomArrayItem(commentsData.messages),
  };
};

export const generateComments = (count) => {
  return new Array(count).fill(``).map(() => generateComment());
};
