import { Model, DataTypes } from 'sequelize';
import db from '../database.js';
import { InferAttributes, InferCreationAttributes } from 'sequelize';

class Question extends Model<InferAttributes<Question>, InferCreationAttributes<Question, { omit: 'id' }>> {
  declare id: number;
  declare author?: string;
  declare riddle: string;
  declare category: string;
  declare answers: string[];
  declare descriptions: string[];
  declare mapID?: number;
}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    riddle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answers: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    descriptions: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mapID: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: 'Question',
  }
);

export default Question;
