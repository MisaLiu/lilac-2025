import { Model, DataTypes } from 'sequelize';
import db from '../database.js';

export type TTeam = {
  members: number[];
  collectionsOwned: number[];
  score: number;
  tipsPoint?: number;
  mapLocation?: number;
  puzzleID?: number;
};

class Team extends Model {
  declare id: number;
  declare members: number[];
  declare collectionsOwned: number[];
  declare score: number;
  declare tipsPoint?: number;
  declare mapLocation?: number;
  declare puzzleID?: number;
}

Team.init(
  {
    members: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    collectionsOwned: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    score: {
      type: DataTypes.NUMBER,
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
    puzzleID: {
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
