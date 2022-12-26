import { sequelize } from '../utils/db.js';

import { DataTypes } from 'sequelize';

export const Post = sequelize.define('Post', {
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  body: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'posts',
});

export async function getAllPosts() {
  const result = await Post.findAll();

  return result;
}

export async function getPostsByUserId(userId) {
    const result = await Post.findAll({
      where: {
        userid: userId,
      }
    })

    return result;
  }

export async function getPostById(id) {
  const result = await Post.findOne({
    where: {
      id: id,
    }
  })
  return result;
}

export async function deletePostById(id) {
  await Post.destroy({
    where: {
      id: id,
    }
  });
}
