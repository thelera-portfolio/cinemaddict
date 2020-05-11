export default class Comment {
  constructor(data) {
    this.author = data[`author`];
    this.date = data[`date`];
    this.emotion = data[`emotion`];
    this.id = data[`id`];
    this.message = data[`comment`];
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

  static parseComment(data) {
    return new Comment(data);
  }

  static parseComments(data) {
    return data.map(Comment.parseComment);
  }

  static clone(data) {
    return new Comment(data.toRAW());
  }
}
