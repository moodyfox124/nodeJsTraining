import Joi from "@hapi/joi";

const refreshTokenAuthenticationSchema = Joi.object().keys({
  refresh_token: Joi.string().uuid().required(),
  id: Joi.string().uuid().required(),
});

export { refreshTokenAuthenticationSchema };
