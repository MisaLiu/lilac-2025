import { Model, DataTypes } from 'sequelize';
import db from '../database.js';
import { InferAttributes, InferCreationAttributes } from 'sequelize';

class Collection extends Model<InferAttributes<Collection>, InferCreationAttributes<Collection>> {
  declare name: string;
  declare type: 'positive' | 'negative' | 'neutral';
  declare description: string;
}

Collection.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: [ 'positive', 'negative', 'neutral' ],
      defaultValue: 'neutral',
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Collection',
  }
);

export default Collection;
