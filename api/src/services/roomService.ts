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

  static async createRoom(userIds: string[]){
    const room = await prisma.room.create({
      data: {
        users: {
          connect: userIds.map(id => ({ id }))
        }
      }
    })

    return room
  }

  static async getRoomById(roomId: string){
    const room = await prisma.room.findUnique({
      where: {
        id: roomId
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
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 10
        }
      }
    })

    room.messages = room.messages.reverse()

    return room
  }

  static async getRoomByUsersIds(userIds: string[]){
    const room = await prisma.room.findFirst({
      where: {
        users: {
          every: {
            id: {
              in: userIds
            }
          }
        }
      }
    })

    return room
  }

  static async getRoomByUsersEmails(emails: string[]){
    const room = await prisma.room.findFirst({
      where: {
        users: {
          every: {
            email: {
              in: emails
            }
          }
        }
      }
    })

    return room
  }

  static async deleteRoom(roomId: string){
    const room = await prisma.room.delete({
      where: {
        id: roomId
      },
    })

    return room
  }

}