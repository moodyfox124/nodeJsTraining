import Joi from "@hapi/joi";

const refreshTokenRejectSchema = Joi.object().keys({
  id: Joi.string().uuid().required(),
});

export { refreshTokenRejectSchema };
