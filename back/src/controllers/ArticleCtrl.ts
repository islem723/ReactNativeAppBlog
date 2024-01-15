import { Request, Response } from 'express';
import Article from '../models/Article';
import IArticle from '../types';
import { io } from '../config/server';

export default async function createArticle(req: Request, res: Response) {
  try {
    const { content, title, topic, owner }: IArticle = req.body;

    const existingArticle = await Article.findOne({ title });
    if (existingArticle) {
      return res
        .status(400)
        .json({ error: 'Article with the same title already exists' });
    }

    const filename = req.file?.filename;

    /* if (!filename) {
      return res.status(400).json({ error: 'No image selected!' });
    }
    */

    const tags = JSON.parse(req.body.tags as string) as string[];

    const newArticle = await Article.create({
      content,
      title,
      topic,
      tags,
      image: filename,
      owner,
    });

    io.emit('article_added', {
      data: 'A new article has been added, check it out!',
    });

    res.status(201).json(newArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getArticleById(req: Request, res: Response) {
  try {
    const { articleId } = req.params;

    const article = await Article.findOne({ _id: articleId });

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.status(200).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
export async function getAllArticles(req: Request, res: Response) {
  res.send(await Article.find());
}

export async function UpdateArticle(req: Request, res: Response) {
  const { articleid } = req.params;

  const { content, title, topic, tags, image, owner }: IArticle = req.body;
  const updateRes = await Article.updateOne(
    { _id: articleid },
    {
      $set: {
        content,
        title,
        topic,
        tags,
        image,
        owner,
      },
    },
    { upsert: false },
  );

  if (!updateRes.modifiedCount)
    return res.status(404).json({ error: 'No update!' });

  res.send({
    message: 'Article updated!',
    product: await Article.findOne({ _id: articleid }),
  });
}

export async function deleteArticle(req: Request, res: Response) {
  try {
    const { articleId } = req.params;

    await Article.deleteOne({ _id: articleId });

    res.send({ message: 'Article deleted successfully' });
  } catch (error) {
    console.log('error in deleteCategory', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
