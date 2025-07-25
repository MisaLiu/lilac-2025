import { Model, DataTypes } from 'sequelize';
import db from '../database.js';

class Collection extends Model {
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
