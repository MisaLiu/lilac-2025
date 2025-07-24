import { resolve } from 'node:path';
import { Sequelize } from 'sequelize'; 
import { __dirname } from './consts.js';

const db = new Sequelize({
  dialect: 'sqlite',
  storage: resolve(__dirname, './db.sqlite3'),
});

export default db;
