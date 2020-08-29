import Joi from '@hapi/joi';

const userSchema = Joi.object().keys({
    login: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string()
        .regex(/[a-zA-Z]+/)
        .regex(/[0-9]+/)
        .min(3)
        .max(30)
        .required(),
    age: Joi.number().integer().min(4).max(130).required()
});

export { userSchema };
