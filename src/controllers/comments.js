import {
  getAllCommentsByPostId,
  deleteCommentsById,
  getCommentById,
  insertComment,
} from '../servises/comments.js';

function validateEmail(value) {
  if (!value) {
    return 'Email is required';
  }

  const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailPattern.test(value)) {
    return 'Email is not valid';
  }
}

function validateUserName(value) {
  if (!value) {
    return 'UserName is required';
  }

  const usernamePattern = /^[a-zA-Z0-9]+$/;

  if (!usernamePattern.test(value)) {
    return 'UserName is not valid';
  }
}

function validateHomePage(value) {
  if (value === '') {
    return 'HomePage is not required';
  }

  const homepagePattern = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/ig;

  if (!homepagePattern.test(value)) {
    return 'HomePage is not valid';
  }
}

function validateComment(value) {
  if (!value) {
    return 'Comment is required';
  }

  const commentPattern = /(?!\<\/?((a|code|strong|i|p)).*?>)<.*?>/g;

  if (commentPattern.test(value)) {
    return 'You should use allowed tags(a/code/strong/i/p)';
  }
}

export const getAllCommentsPost = async(req, res) => {
  const comments = await getAllCommentsByPostId(req.query.postId);
  if (!req.query.postId) {
    res.statusCode = 400;

    return;
  }

  if (!comments) {
    res.statusCode = 404;
    res.send('Not found');

    return;
  }
  res.statusCode = 200;
  res.send(comments);
};

export const deleteComment = async(req, res) => {
  const user = await getCommentById(req.params.commentId);

  if (!req.params.commentId) {
    res.statusCode = 400;

    return;
  }

  if (!user) {
    res.statusCode = 404;
    res.send('Not found');

    return;
  }

  deleteCommentsById(req.params.commentId);
  res.statusCode = 204;
  res.send('No Content');
};


export const setComment = async(req, res) => {
  
  if (!req.body.postid) {
    res.statusCode = 400;
    res.send('Bad Request');

    return;
  };

  const errors = {
    username: validateUserName(req.body.name),
    email: validateEmail(req.body.email),
    homepage: validateHomePage(req.body.homepage),
    body: validateComment(req.body.body),
  }

  if (errors.username || errors.email || errors.homepage || errors.comment) {
    res.statusCode = 400;
    res.send(errors);
  } else {
    const comment = {
      postid: req.body.postid,
      name: req.body.name,
      email: req.body.email,
      homepage: req.body.homepage,
      body: req.body.body,
    };
  
    insertComment(
      comment.postid,
      comment.name,
      comment.email,
      comment.homepage,
      comment.body,
    );
    res.statusCode = 201;
    res.send(comment);
  }
};
