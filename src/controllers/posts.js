import {
  getAllPosts,
  getPostsByUserId,
  getPostById,
  deletePostById,
} from '../servises/posts.js';

export const getAll = async(req, res) => {
  const posts = await getAllPosts();
  
  if(!req.query.userId) {
    res.send(posts);
  }
  const postsUser = await getPostsByUserId(req.query.userId);
  res.send(postsUser);
};

export const getPost = async(req, res) => {
  const post = await getPostById(req.params.postId);

  if (!req.params.postId) {
    res.statusCode = 400;

    return;
  }

  if (!post) {
    res.statusCode = 404;
    res.send('Not found');

    return;
  }
  res.statusCode = 200;
  res.send(post);
};

export const deletePost = async(req, res) => {
  const post = await getPostById(req.params.postId);

  if (!req.params.postId) {
    res.statusCode = 400;

    return;
  }

  if (!post) {
    res.statusCode = 404;
    res.send('Not found');

    return;
  }

  deletePostById(req.params.postId);
  res.statusCode = 204;
  res.send('No Content');
};
