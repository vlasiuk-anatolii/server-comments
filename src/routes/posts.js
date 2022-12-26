import {
  getAll,
  getPost,
  deletePost,
} from '../controllers/posts.js';

import express from 'express';
export const routerPosts = express.Router();

routerPosts.get('/', getAll);
routerPosts.get('/:postId', getPost);
routerPosts.delete('/:postId', express.json(), deletePost);
