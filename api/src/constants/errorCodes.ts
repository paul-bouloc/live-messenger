export type ErrorCode = {
  name?: string;
  message: string;
  statusCode: number;
}

const errorCodes = {
    // User
    USER_NOT_FOUND: <ErrorCode>{name: 'UserError', message: 'User not found', statusCode: 404},
    USER_ALREADY_EXISTS: <ErrorCode>{name: 'UserError', message: 'User already exists', statusCode: 409},

    // Auth
    UNAUTHORIZED: <ErrorCode>{name: 'AuthError', message: 'Unauthorized', statusCode: 401},
    INVALID_TOKEN: <ErrorCode>{name: 'AuthError', message: 'Invalid token', statusCode: 401},
    INVALID_CREDENTIALS: <ErrorCode>{name: 'AuthError', message: 'Invalid credentials', statusCode: 401},
    TOKEN_EXPIRED: <ErrorCode>{name: 'AuthError', message: 'Token expired', statusCode: 401},

}

export default errorCodes;