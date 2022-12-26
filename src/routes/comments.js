import {
  getAllCommentsPost,
  setComment,
  deleteComment,
} from '../controllers/comments.js';

import express from 'express';
import { getCommentById } from '../servises/comments.js';
export const routerComments = express.Router();

routerComments.get('/', getAllCommentsPost);
routerComments.get('/:commentsId', getCommentById);
routerComments.post('/', express.json(), setComment);
routerComments.delete('/:commentId', express.json(), deleteComment);
