import express from 'express';

import createBookmark, {
  deleteBookmark,
  getAllfavoriteArticles,
} from '../controllers/UserBookmarksCtrl';

const UserBookmarkRoutes = express.Router();

UserBookmarkRoutes.route('/').post(createBookmark).get(getAllfavoriteArticles);

UserBookmarkRoutes.route('/:userId/:articleId').delete(deleteBookmark);

export default UserBookmarkRoutes;
