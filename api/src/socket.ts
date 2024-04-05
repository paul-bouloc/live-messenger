import { Server } from "socket.io";
import { extractSocketUserFromJwt } from "./websocket/middlewares/extractSocketUserFromJwt";
import { isSocketAuthenticated } from "./websocket/middlewares/isSocketAuthenticated";
import { User, PrismaClient } from "@prisma/client";
import { SocketResponse } from "./models/socketResponse";

const prisma = new PrismaClient()

export const socketServer = (server) => {
  const io = new Server(server, {
    connectionStateRecovery: {
      maxDisconnectionDuration: 5000,
    },
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true
    },
  })
  .use(extractSocketUserFromJwt)
  .use(isSocketAuthenticated);

  io.on('connection', (socket) => {
    console.log(`${socket.data.user.name} connected`);

    socket.join(`user-${socket.data.user.id}`)

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

    socket.on('new-room', async (email, callback) => {
      try {

        if(email === socket.data.user.email) {
          throw new Error('Vous ne pouvez pas vous envoyer un message à vous-même.')
        }

        const requestedUser = await prisma.user.findUnique({
          where: {
            email
          }
        })

        if (!requestedUser) {
          throw new Error('Utilisateur introuvable.')
        }

        const user: Omit<User, 'password'> = socket.data.user
        
        const isRoomExisting = await prisma.room.findFirst({
          where: {
            users: {
              every: {
                id: {
                  in: [user.id, requestedUser.id]
                }
              }
            }
          }
        })

        if (isRoomExisting) {
          throw new Error('Conversation déjà existante.')
        }

        const room = await prisma.room.create({
          data: {
            users: {
              connect: [
                {
                  id: user.id
                },
                {
                  id: requestedUser.id
                }
              ]
            }
          }
        })

        const returnedRoom = await prisma.room.findUnique({
          where: {
            id: room.id
          },
          include: {
            users: true,
            messages: {
              orderBy: {
                createdAt: 'asc'
              },
              take: 1
            }
          }
        })

        socket.join(`room-${room.id}`)

        io
          .to(`user-${requestedUser.id}`)
          .to(`user-${user.id}`)
          .emit('room:new', returnedRoom)

        callback(<SocketResponse>{
          success: true,
          message: 'Conversation créée avec succès !',
          data: {
            room
          }
        })
      } catch (error) {
        callback(<SocketResponse>{
          success: false,
          message: error.message || 'Erreur lors de la création de la conversation.'
        })
      }
    })
  });
}
