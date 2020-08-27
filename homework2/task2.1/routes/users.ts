import express from 'express';
import { createValidator } from 'express-joi-validation';
import { userSchema } from '../schemas/user';

import {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
} from '../controller/users';

const router = express.Router();
const validator = createValidator();

router.route('/').get(getUsers).post(validator.body(userSchema), createUser);

router
    .route('/:id')
    .get(getUserById)
    .put(validator.body(userSchema), updateUser)
    .delete(deleteUser);

export default router;
