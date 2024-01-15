// src/index.ts
import express from 'express';
import connectDB from './config/db';
import userRoutes from './routes/UserRoutes';
import ArticleRoutes from './routes/ArticleRoutes';
import UserBookmarkRoutes from './routes/UserBookmarksRoutes';
import morgan from 'morgan';
import cors from 'cors';
import { PORT } from './config/env';
import { app, http } from './config/server';

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/user', userRoutes);
app.use('/article', ArticleRoutes);
app.use('/userBookmark', UserBookmarkRoutes);
app.use(
  '/img',
  express.static('uploads', {
    extensions: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
  }),
);

connectDB(() =>
  http.listen(PORT, () => console.log(`Listening to port: ${PORT}`)),
);
