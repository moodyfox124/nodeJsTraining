import express from "express";
import { createValidator } from "express-joi-validation";
import {
  getAllGroups,
  createGroup,
  getGroupById,
  updateGroup,
  deleteGroup,
} from "../controllers/groups";
import { addUsersToGroup } from "../controllers/userGroup";
import { idRequired } from "../schemas/query";
import { groupSchema } from "../schemas/group";

const router = express.Router();
const validator = createValidator();

router
  .route("/")
  .get(getAllGroups)
  .post(validator.body(groupSchema), createGroup);

router
  .route("/:id")
  .all(validator.params(idRequired))
  .get(getGroupById)
  .put(validator.body(groupSchema), updateGroup)
  .delete(deleteGroup);

router.route("/:id/addUsers").post(addUsersToGroup);

export default router;
