import { Model, DataTypes, UUIDV4 } from "sequelize";
import { sequelizeConnection } from "../data-access/connection";
import { TABLE_NAME } from "../utils/constants";

class UserModel extends Model {
  id: string;
  login: string;
  password: string;
  age: number;
  is_deleted?: boolean;
}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: TABLE_NAME,
    modelName: "User",
    schema: "public",
    timestamps: false,
  }
);

export default UserModel;
