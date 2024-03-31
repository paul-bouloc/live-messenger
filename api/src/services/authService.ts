import jwt, { JwtPayload } from 'jsonwebtoken';
import UserService from './userService';
import { AppError } from '@/models/appError';
import errorCodes from '@/constants/errorCodes';
import bcrypt from 'bcrypt';

export default class AuthService {

  static generateJwtToken(userId: string){
    const jwtSecretKey = process.env.JWT_SECRET_KEY as string
    return jwt.sign({userId},jwtSecretKey,{expiresIn: "7d"})
  }

  static verifyJwtToken(token: string){
    const jwtSecretKey = process.env.JWT_SECRET_KEY as string
    const payload = jwt.verify(token, jwtSecretKey) as JwtPayload
    if(payload){
      return payload.userId
    }
  }

  static async login(email: string, password: string){

    const user = await UserService.getUserByEmail(email)
    if(!user) {
      throw new AppError(errorCodes.UNAUTHORIZED)
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
      throw new AppError(errorCodes.UNAUTHORIZED)
    }

    const {password:pw, ...userWithoutPassword} = user
    
    return userWithoutPassword
  }

}