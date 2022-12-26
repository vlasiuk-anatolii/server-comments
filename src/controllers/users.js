import {
  getAllUsers,
} from '../servises/users.js';

export const getAll = async(req, res) => {
  const users = await getAllUsers();
  res.send(users);
};
