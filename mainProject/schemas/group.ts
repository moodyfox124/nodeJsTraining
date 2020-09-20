import Joi from "@hapi/joi";
import { PERMISSIONS } from "../helpers/constants";

const groupSchema = Joi.object().keys({
  name: Joi.string().required(),
  permissions: Joi.array().items(Joi.string().valid(...PERMISSIONS)).required(),
});

export { groupSchema };
