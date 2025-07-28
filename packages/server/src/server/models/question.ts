import { Model, DataTypes } from 'sequelize';
import db from '../database.js';

class Question extends Model {
  declare id: number;
  declare author?: string;
  declare riddle: string;
  declare category: string;
  declare answers: string[];
  declare descriptions: string[];
  declare belongsToMap?: number;
}

Question.init(
  {
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
    belongsToMap: {
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
