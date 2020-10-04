import GroupModel from "../database/models/group";
import { errorLogger, invokedMethodLogger } from "../utils/logger/loggers";

class GroupService {
  @invokedMethodLogger
  @errorLogger
  getAllGroups() {
    return GroupModel.findAll();
  }

  @invokedMethodLogger
  @errorLogger
  createGroup(groupData) {
    return GroupModel.create({
      ...groupData,
    });
  }

  @invokedMethodLogger
  @errorLogger
  getGroupById(id) {
    return GroupModel.findOne({
      where: {
        id,
      },
    });
  }

  @invokedMethodLogger
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

  @invokedMethodLogger
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
