export default interface IUser {
  email: string;
  name: string;
  password: string;
}
export default interface IArticle {
  content: string;
  title: string;
  topic: string;
  tags: [string];
  image?: string;
  owner: string;
}
export default interface IUserBookmark {
  userId: string;
  articleId: string;
}
