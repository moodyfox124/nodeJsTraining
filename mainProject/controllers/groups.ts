import { groupService } from "../services/groupService";
import { logger } from "../utils/logger/loggerInstance";

const getAllGroups = async (req, res) => {
  try {
    const allGroups = await groupService.getAllGroups();

    res.send(allGroups);
  } catch (err) {
    logger.error(err.message);
    res.status(500).send(err.message);
  }
};

const createGroup = async (req, res) => {
  const groupData = req.body;

  try {
    const groupRecord = await groupService.createGroup(groupData);

    res.send(`Group was created. Group received id: ${groupRecord.id}`);
  } catch (err) {
    logger.error(err.message);
    res.status(500).send(err.message);
  }
};

const getGroupById = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await groupService.getGroupById(id);

    if (!group) {
      return res
        .status(404)
        .send("There is no record in the Database with this ID.");
    }

    res.json(group);
  } catch (err) {
    logger.error(err.message);
    res.status(500).send(err.message);
  }
};

const updateGroup = async (req, res) => {
  const { id } = req.params;
  const groupData = req.body;
  try {
    const updatedGroup = await groupService.updateGroup(id, groupData);

    if (!updatedGroup[0]) {
      return res
        .status(404)
        .send("There is no record in the Database with this ID.");
    }

    res.send("Record updated.");
  } catch (err) {
    logger.error(err.message);
    res.status(500).send(err.message);
  }
};

const deleteGroup = async (req, res) => {
  const { id } = req.params;
  try {
    const numberOfDeletedGroups = await groupService.deleteGroup(id);
    if (!numberOfDeletedGroups) {
      return res
        .status(404)
        .send("There is no record in the Database with this ID.");
    }
    res.send(`Record deleted.`);
  } catch (err) {
    logger.error(err.message);
    res.status(500).send(err.message);
  }
};

export { getAllGroups, createGroup, getGroupById, updateGroup, deleteGroup };
