// types.ts
export interface Article {
  _id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string; // Add the actual type of createdAt
  updatedAt: string; // Add the actual type of updatedAt
}
