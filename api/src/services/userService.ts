import { PrismaClient, User } from '@prisma/client'
const prisma = new PrismaClient()
import bcrypt from 'bcrypt';

export default class UserService {

  static async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    })
    return user || undefined
  }

  static async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    })
    return user || undefined
  }

  static async createUser(name:string, email:string, password:string) {
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })
    delete newUser.password
    return newUser
  }

}