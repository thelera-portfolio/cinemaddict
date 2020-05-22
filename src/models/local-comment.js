import Comment from "../models/comment.js";
import Movie from "../models/movie.js";

export default class LocalComment {
  constructor(comment) {
    this.message = comment[`comment`];
    this.date = comment[`date`];
    this.emotion = comment[`emotion`];
  }

  toRAW() {
    return {
      "comment": this.message,
      "date": this.date,
      "emotion": this.emotion,
    };
  }

  static clone(comment) {
    return new LocalComment(comment.toRAW());
  }

  static parseComment(comment) {
    return {
      movie: new Movie(comment.movie),
      comments: new Comment(comment.comments[comment.comments.length - 1]),
    };
  }

  static parseComments(comment) {
    return comment.map(LocalComment.parseComment);
  }
}
