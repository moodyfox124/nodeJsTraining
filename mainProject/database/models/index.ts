import UserModel from "./user";
import GroupModel from "./group";
import UserGroupModel from "./userGroup";

UserModel.belongsToMany(GroupModel, {
  through: UserGroupModel,
  onDelete: "CASCADE",
});

GroupModel.belongsToMany(UserModel, {
  through: UserGroupModel,
  onDelete: "CASCADE",
});

export { UserModel, GroupModel, UserGroupModel };
