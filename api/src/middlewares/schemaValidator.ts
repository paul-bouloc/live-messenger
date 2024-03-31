import { ValidationError } from "@/models/validationError";
import { RequestHandler } from "express";
import { ObjectSchema } from "joi";

const schemaValidator = (schema: ObjectSchema, useJoiError = true): RequestHandler => {

  return (req, res, next) => {

    const { error, value } = schema.validate(req.body, { abortEarly: false, allowUnknown: false, stripUnknown: false});

    if (error) {
      throw new ValidationError(error.message)
    }

    req.body = value;
    return next();
  };
};

export default schemaValidator;