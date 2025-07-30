import { Model, DataTypes } from 'sequelize';
import db from '../database.js';
import { InferAttributes, InferCreationAttributes } from 'sequelize';

class Team extends Model<
  InferAttributes<Team>,
  InferCreationAttributes<Team, { omit: 'id' | 'collectionsOwned' | 'score' | 'tipsPoint' | 'mapLocation' | 'questionID' }>
> {
  declare id: number;
  declare members: number[];
  declare collectionsOwned: number[];
  declare score: number;
  declare tipsPoint?: number;
  declare mapLocation?: number;
  declare questionID?: number;
}

Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    members: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    collectionsOwned: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    score: {
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: 0,
    },
    tipsPoint: {
      type: DataTypes.NUMBER,
      allowNull: true,
      defaultValue: null,
    },
    mapLocation: {
      type: DataTypes.NUMBER,
      allowNull: true,
      defaultValue: null,
    },
    questionID: {
      type: DataTypes.NUMBER,
      allowNull: true,
      defaultValue: null,
    }
  },
  {
    sequelize: db,
    modelName: 'Team',
  }
);

export default Team;
