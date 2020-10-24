import Joi from "@hapi/joi";

const jwtAuthenticationSchema = Joi.object().keys({
  login: Joi.string().required(),
  password: Joi.string().required(),
});

export { jwtAuthenticationSchema };
