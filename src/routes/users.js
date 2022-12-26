import {
  getAll,
} from '../controllers/users.js';

import express from 'express';
export const routerUsers = express.Router();

routerUsers.get('/', getAll);
