// types.ts
export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Article {
  _id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string; // Add the actual type of createdAt
  updatedAt: string; // Add the actual type of updatedAt
}

export interface ApiResponse {
  message?: string;
  error?: string;
}

export interface LoginResponse {
  token?: string;
  error?: string;
}

export interface UserBookmark {
  _id: string;
  User: User;
  Article: Article;
}
