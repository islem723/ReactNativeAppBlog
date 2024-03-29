import { Request, Response } from 'express';
import UserBookmarks from '../models/UserBookmarks';
import IUserBookmark from '../types';
import Article from '../models/Article';
import User from '../models/User';

export default async function createBookmark(req: Request, res: Response) {
  try {
    const { userId, articleId }: IUserBookmark = req.body;

    const existingArticle = await Article.findById(articleId);
    const existingUser = await User.findById(userId);

    if (!existingArticle || !existingUser) {
      return res.status(404).json({ message: 'Article or user not found' });
    }
    const newBookmark = await UserBookmarks.create({
      User: userId,
      Article: articleId,
    });

    return res.status(200).json({ message: 'Bookmark added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to create bookmark' });
  }
}

export async function getAllfavoriteArticles(req: Request, res: Response) {
  const favoritearticle = await UserBookmarks.find({ User: req.query.userId })
    .populate('User')
    .populate('Article');
  res.status(200).json(favoritearticle);
}

export async function deleteBookmark(req: Request, res: Response) {
  try {
    const { userId, articleId } = req.body;
    const deletedResult = await UserBookmarks.deleteOne({
      userId,
      articleId,
    });

    if (!deletedResult.deletedCount) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }

    return res.status(200).json({ message: 'Bookmark deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to delete bookmark' });
  }
}
