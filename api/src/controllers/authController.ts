import { AppError } from "@/models/appError"
import errorCodes from "@/constants/errorCodes"
import userService from "@/services/userService"
import bcrypt from 'bcrypt'
import AuthService from "@/services/authService"

export const register = async (req, res, next) => {

  const { name, email, password } = req.body

  const user = await userService.getUserByEmail(email)

  if (user) {
    throw new AppError(errorCodes.USER_ALREADY_EXISTS)
  }else{
    const newUser = await userService.createUser(name, email, password)
    return res.status(201).json({message: 'User created', user: newUser})
  }

}

export const login = async (req, res, next) => {

  const { email, password } = req.body

  const user = await AuthService.login(email, password)

  const token = AuthService.generateJwtToken(user.id)

  return res
          .cookie('jwt', token, {httpOnly: true, signed: true, secure: process.env.NODE_ENV === 'production'})
          .status(200)
          .json({message: 'Login successful', user})


}

export const currentUser = async (req, res, next) => {
  return res.status(200).json(req.user)
}