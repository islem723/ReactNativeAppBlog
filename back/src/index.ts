// src/index.ts
import express from 'express';
import connectDB from './config/db';
import userRoutes from './routes/UserRoutes';
import ArticleRoutes from './routes/ArticleRoutes';
import UserBookmarkRoutes from './routes/UserBookmarksRoutes';
import morgan from 'morgan';
import cors from 'cors';
const app = express();
const port = 3000;
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes);
app.use('/article', ArticleRoutes);
app.use('/userBookmark', UserBookmarkRoutes);
connectDB(() =>
  app.listen(port, () => console.log(`Listening to port: ${port}`)),
);
