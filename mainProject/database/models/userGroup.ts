import { Model, DataTypes } from "sequelize";
import { sequelizeConnection } from "../connection";
import { USER_GROUP_TABLE_NAME } from "../../helpers/constants";
import GroupModel from "./group";
import UserModel from "./user";

class UserGroupModel extends Model {
  user_id: string;
  group_id: string;
}

UserGroupModel.init(
  {
    UserId: {
      type: DataTypes.UUID,
      primaryKey: true,
      field: 'user_id',
      allowNull: false,
      references: {
        model: UserModel,
        key: "id",
      },
    },
    GroupId: {
      type: DataTypes.UUID,
      primaryKey: true,
      field: 'group_id',
      allowNull: false,
      references: {
        model: GroupModel,
        key: "id",
      },
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: USER_GROUP_TABLE_NAME,
    modelName: "UserGroup",
    schema: "public",
    timestamps: false,
    freezeTableName: true,
  }
);

export default UserGroupModel;
