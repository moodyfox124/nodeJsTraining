import { Model, DataTypes, UUIDV4 } from "sequelize";
import { sequelizeConnection } from "../connection";
import { USER_TABLE_NAME } from "../../helpers/constants";

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
    tableName: USER_TABLE_NAME,
    modelName: "User",
    schema: "public",
    timestamps: false,
  }
);

export default UserModel;
