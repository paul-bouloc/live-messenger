import AuthService from '@/services/authService';
import { PrismaClient, User } from '@prisma/client'
const prisma = new PrismaClient()

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

    const {password, ...user} = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!user) {
      return next(new Error('Socket authentication error'));
    }

    socket.data.user = user as Omit<User, 'password'>;

    return next()
  } catch (error) {
    return next(error);
  }
}