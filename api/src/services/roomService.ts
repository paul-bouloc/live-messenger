import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default class RoomService {

  static async getUserRoomsById(userId: string){
    const rooms = await prisma.room.findMany({
      where: {
        users: {
          some: {
            id: userId
          }
        }
      },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        messages: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 1
        }
      }
    })

    return rooms
  }

}