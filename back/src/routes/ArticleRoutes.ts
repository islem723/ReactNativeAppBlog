import express from 'express';

import createArticle, {
  getArticleById,
  getAllArticles,
  UpdateArticle,
  deleteArticle,
} from '../controllers/ArticleCtrl';

import imageUpload from '../middleware/multer';

const articleRoutes = express.Router();

articleRoutes.route('/').post(imageUpload, createArticle).get(getAllArticles);

articleRoutes.route('/:articleId').get(getArticleById);
articleRoutes.route('/:articleid').put(UpdateArticle);
articleRoutes.route('/:articleId').delete(deleteArticle);
export default articleRoutes;
