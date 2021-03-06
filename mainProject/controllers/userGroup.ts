import { userGroupService } from "../services/userGroupService";
import { logger } from "../utils/logger/loggerInstance";

const addUsersToGroup = async (req, res) => {
  const { id } = req.params;
  const requestBody = req.body;
  try {
    await userGroupService.addUsersToGroup(id, requestBody.users);

    res.send(`UserGroup record was added.`);
  } catch (err) {
    logger.error(err.message);
    res.status(500).send(err.message);
  }
};

export { addUsersToGroup };
