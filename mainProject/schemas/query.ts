import Joi from "@hapi/joi";

const autosuggestSchema = Joi.object().keys({
  login: Joi.string().required(),
  limit: Joi.number().integer().min(0).required(),
});

const idRequired = Joi.object().keys({
  id: Joi.string().guid().required(),
});

export { autosuggestSchema, idRequired };
