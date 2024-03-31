import Joi from "joi";

export const authRegisterSchema = Joi.object().keys({
  name: Joi.string().required().min(3).max(30).trim(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(30)
})