import { sequelize } from '../utils/db.js';

import { DataTypes } from 'sequelize';

export const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  avatar: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
});

export async function getAllUsers() {
  const result = await User.findAll();

  return result;
}
