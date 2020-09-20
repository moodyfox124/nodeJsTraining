import GroupModel from "../database/models/group";

class GroupService {
  getAllGroups() {
    return GroupModel.findAll();
  }

  createGroup(groupData) {
    return GroupModel.create({
      ...groupData,
    });
  }

  getGroupById(id) {
    return GroupModel.findOne({
      where: {
        id,
      },
    });
  }

  updateGroup(id, groupData) {
    return GroupModel.update(
      {
        ...groupData,
      },
      {
        where: {
          id,
        },
      }
    );
  }

  deleteGroup(id) {
    return GroupModel.destroy({
      where: {
        id,
      },
    });
  }
}

export const groupService = new GroupService();
