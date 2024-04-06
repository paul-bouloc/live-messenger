import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default class MessageService {
  
    static async getRoomMessages(roomId: string){
      const messages = await prisma.message.findMany({
        where: {
          roomId
        },
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
          createdAt: 'asc'
        },
        take: 20
      })
  
      return messages
    }
  
    static async createMessage(roomId: string, userId: string, content: string){
      const message = await prisma.message.create({
        data: {
          content,
          user: {
            connect: {
              id: userId
            }
          },
          room: {
            connect: {
              id: roomId
            }
          }
        }
      })
  
      return message
    }

    static async getMessageById(messageId: string){
      const message = await prisma.message.findUnique({
        where: {
          id: messageId
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      })

      return message
    }
}