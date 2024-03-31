import { ErrorCode } from "../constants/errorCodes";

export class AppError extends Error {

  statusCode: number;

  constructor(error: ErrorCode){
    super(error.message);
    this.statusCode = error.statusCode;
    this.name = error.name || 'Error';
  }

}