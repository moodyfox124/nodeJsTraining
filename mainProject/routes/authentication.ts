import express from "express";
import { jwtAuthenticationSchema } from "../schemas/jwtAuthentication";
import { refreshTokenAuthenticationSchema } from "../schemas/refreshTokenAuthentication";
import { refreshTokenRejectSchema } from "../schemas/refreshTokenReject";
import {
  jwtAuthentication,
  refreshTokenAuthentication,
  refreshTokenReject,
} from "../controllers/authentication";
import { createValidator } from "express-joi-validation";

const router = express.Router();
const validator = createValidator();

router
  .route("/jwt")
  .post(validator.body(jwtAuthenticationSchema), jwtAuthentication);

router
  .route("/refreshToken")
  .post(
    validator.body(refreshTokenAuthenticationSchema),
    refreshTokenAuthentication
  );

router
  .route("/refreshToken/reject")
  .post(validator.body(refreshTokenRejectSchema), refreshTokenReject);

export default router;
