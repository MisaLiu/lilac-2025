import { Model, DataTypes } from 'sequelize';
import db from '../database.js';
import { InferAttributes, InferCreationAttributes } from 'sequelize';

class Map extends Model {
  declare id: number;
  declare name: string;
  declare parent?: number;
  declare childrens?: number[];
};

Map.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parent: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    childrens: {
      type: DataTypes.JSON,
      defaultValue: [],
      allowNull: false,
    }
  },
  {
    sequelize: db,
    modelName: 'Map',
  }
);

export default Map;
