import express from "express";
import { createValidator } from "express-joi-validation";
import { userSchema } from "../schemas/user";
import { autosuggestSchema, idRequired } from "../schemas/query";

import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/users";

const router = express.Router();
const validator = createValidator();

router
  .route("/")
  .get(validator.query(autosuggestSchema), getUsers)
  .post(validator.body(userSchema), createUser);

router
  .route("/:id")
  .all(validator.params(idRequired))
  .get(getUserById)
  .put(validator.body(userSchema), updateUser)
  .delete(deleteUser);

export default router;
