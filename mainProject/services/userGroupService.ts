import UserGroupModel from "../database/models/userGroup";
import { sequelizeConnection } from "../database/connection";
import { errorLogger, invokedMethodLogger } from "../utils/logger/loggers";

class UserGroupService {
  @invokedMethodLogger
  @errorLogger
  async addUsersToGroup(groupId, userIds) {
    await sequelizeConnection.transaction(async (transaction) => {
      const addedRecords = userIds.map(async (userId) => {
        return UserGroupModel.create(
          {
            UserId: userId,
            GroupId: groupId,
          },
          {
            transaction,
          }
        );
      });
      await Promise.all(addedRecords);
    });
  }
}

export const userGroupService = new UserGroupService();
