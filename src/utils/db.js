import { Sequelize } from "sequelize";

export const sequelize = new Sequelize ('Post-Comments', 'postgres', '1711', {
  host: 'localhost',
  dialect: 'postgres',
});
