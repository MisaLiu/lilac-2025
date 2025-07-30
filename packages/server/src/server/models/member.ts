import { Model, DataTypes } from 'sequelize';
import db from '../database.js';
import { InferAttributes, InferCreationAttributes } from 'sequelize';

class Member extends Model<InferAttributes<Member>, InferCreationAttributes<Member>> {
  declare name: string;
  declare qq: number;
  declare teamID?: number;
}

Member.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qq: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    teamID: {
      type: DataTypes.NUMBER,
      allowNull: true,
    }
  },
  {
    sequelize: db,
    modelName: 'Member',
  }
);

export default Member;
