import { routerUsers } from './routes/users.js';
import { routerPosts } from './routes/posts.js';
import { routerComments } from './routes/comments.js';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { EventEmitter } from 'events';
const emitter = new EventEmitter();

import express from 'express';
const app = express();
app.use(cors());

app.use('/users', routerUsers);
app.use('/posts', routerPosts);
app.use('/comments', routerComments);

const server = app.listen(5000);

const wss = new WebSocketServer({ server });
emitter.on('message', (message) => {
  wss.clients.send('hi');
});
