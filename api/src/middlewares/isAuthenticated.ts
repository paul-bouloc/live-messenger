import errorCodes from "@/constants/errorCodes";
import { AppError } from "@/models/appError";
import { ValidationError } from "@/models/validationError";

const isAuthenticated = async (req, res, next) => {
  if (req.user) return next();
  next(new AppError(errorCodes.UNAUTHORIZED));
}

export default isAuthenticated;

const schemaValidator = (schema, useJoiError = true) => {

  return (req, res, next) => {

    const { error, value } = schema.validate(req.body, { abortEarly: false, allowUnknown: false, stripUnknown: false});

    if (error) {
      throw new ValidationError(error.message)
    }

    req.body = value;
    return next();
  };
};