import AuthService from '@/services/authService';
import UserService from '@/services/userService';
import { User } from '@prisma/client'

export const extractSocketUserFromJwt = async (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie.split('=')[1]

    if (!token) {
      return next(new Error('Socket authentication error'));
    }

    const userId = AuthService.verifyJwtToken(token);

    if (!userId) {
      return next(new Error('Socket authentication error'));
    }

    const {password, ...user} = await UserService.getUserById(userId);

    if (!user) {
      return next(new Error('Socket authentication error'));
    }

    socket.data.user = user as Omit<User, 'password'>;

    return next()
  } catch (error) {
    return next(error);
  }
}