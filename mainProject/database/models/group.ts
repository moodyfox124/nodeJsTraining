import { Model, DataTypes, UUIDV4 } from "sequelize";
import { Permission } from "../../helpers/types/permissions";
import { sequelizeConnection } from "../connection";
import { GROUP_TABLE_NAME } from "../../helpers/constants";

class GroupModel extends Model {
  id: string;
  name: string;
  permissions: Array<Permission>;
}

GroupModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: GROUP_TABLE_NAME,
    modelName: "Group",
    schema: "public",
    timestamps: false,
  }
);

export default GroupModel;
