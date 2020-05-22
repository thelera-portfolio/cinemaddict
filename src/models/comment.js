export default class Comment {
  constructor(comment) {
    this.author = comment[`author`];
    this.date = comment[`date`];
    this.emotion = comment[`emotion`];
    this.id = comment[`id`];
    this.message = comment[`comment`];
  }

  toRAW() {
    return {
      "id": this.id,
      "author": this.author,
      "emotion": this.emotion,
      "comment": this.message,
      "date": this.date,
    };
  }

  static clone(comment) {
    return new Comment(comment.toRAW());
  }

  static parseComment(comment) {
    return new Comment(comment);
  }

  static parseComments(comment) {
    return comment.map(Comment.parseComment);
  }
}
