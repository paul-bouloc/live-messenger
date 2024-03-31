import errorCodes from "@/constants/errorCodes";
import { AppError } from "@/models/appError";
import { ValidationError } from "@/models/validationError";

const isAuthenticated = async (req, res, next) => {
  if (req.user) return next();
  return next(new AppError(errorCodes.UNAUTHORIZED));
}

export default isAuthenticated;