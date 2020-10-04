import GroupModel from "../database/models/group";
import { errorLogger } from "../utils/logger/loggers";

class GroupService {
  @errorLogger
  getAllGroups() {
    return GroupModel.findAll();
  }

  @errorLogger
  createGroup(groupData) {
    return GroupModel.create({
      ...groupData,
    });
  }

  @errorLogger
  getGroupById(id) {
    return GroupModel.findOne({
      where: {
        id,
      },
    });
  }

  @errorLogger
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

  @errorLogger
  deleteGroup(id) {
    return GroupModel.destroy({
      where: {
        id,
      },
    });
  }
}

export const groupService = new GroupService();
