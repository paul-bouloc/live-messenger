import { AppError } from "@/models/appError"
import errorCodes from "@/constants/errorCodes"
import userService from "@/services/userService"
import bcrypt from 'bcrypt'

export const register = async (req, res, next) => {

  console.log(req.body)

  const { name, email, password } = req.body

  const user = await userService.getUserByEmail(email)

  if (user) {
    throw new AppError(errorCodes.USER_ALREADY_EXISTS)
  }else{
    const newUser = await userService.createUser(name, email, password)
    return res.status(201).json({message: 'User created', user: newUser})
  }

}