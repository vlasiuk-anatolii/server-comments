import { sequelize } from '../utils/db.js';

import { DataTypes } from 'sequelize';

export const Comment = sequelize.define('Comment', {
  postid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  homepage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'comments',
});

export async function getAllCommentsByPostId(postid) {
    const result = await Comment.findAll({
      where: {
        postid: postid,
      }
    })

    return result;
  }


export async function deleteCommentsById(id) {
  await Comment.destroy({
    where: {
      id: id,
    }
  });
}

export async function getCommentById(id) {
  const result = await Comment.findOne({
    where: {
      id: id,
    }
  })

  return result;
}

export async function insertComment(
  postid,
  name,
  email,
  homepage,
  body
  ) {
  const comment = await Comment.create({
    postid: `${postid}`,
    name: `${name}`,
    email: `${email}`,
    homepage: `${homepage}`,
    body: `${body}`,
  });
}
