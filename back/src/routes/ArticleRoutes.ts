import express from 'express';

import createArticle, {
  getArticleById,
  getAllArticles,
  UpdateArticle,
} from '../controllers/ArticleCtrl';
import multerConfig from '../middleware/multer';
import imageUpload from '../middleware/multer';

const articleRoutes = express.Router();

articleRoutes.route('/').post(imageUpload, createArticle).get(getAllArticles);

articleRoutes.route('/:articleId').get(getArticleById);
articleRoutes.route('/:articleid').put(UpdateArticle);

export default articleRoutes;
function route(arg0: string) {
  throw new Error('Function not implemented.');
}
