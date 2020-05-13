import Movie from "../models/movie.js";
import Comment from "../models/comment.js";

export default class LocalComment {
  constructor(data) {
    this.message = data[`comment`];
    this.date = data[`date`];
    this.emotion = data[`emotion`];
  }

  toRAW() {
    return {
      "comment": this.message,
      "date": this.date,
      "emotion": this.emotion,
    };
  }

  static parseComment(data) {
    return {
      movie: new Movie(data.movie),
      comments: new Comment(data.comments[data.comments.length - 1]),
    };
  }

  static parseComments(data) {
    return data.map(LocalComment.parseComment);
  }

  static clone(data) {
    return new LocalComment(data.toRAW());
  }
}
