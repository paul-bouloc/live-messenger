import { Server, Socket } from 'socket.io';

import { User } from "@prisma/client";
import { SocketResponse } from "@/models/socketResponse";
import UserService from '@/services/userService';
import RoomService from '@/services/roomService';

const roomHandler = (io: Server, socket: Socket) => {
  const createRoom = async (email:string, callback:CallableFunction) => {
    try {

      if(email === socket.data.user.email) {
        throw new Error('Vous ne pouvez pas vous envoyer un message à vous-même.')
      }

      const requestedUser = await UserService.getUserByEmail(email)
      if (!requestedUser) {
        throw new Error('Utilisateur introuvable.')
      }

      const user: Omit<User, 'password'> = socket.data.user
      const isRoomExisting = await RoomService.getRoomByUsersIds([user.id, requestedUser.id])
      if (isRoomExisting) {
        throw new Error('Conversation déjà existante.')
      }

      const room = await RoomService.createRoom([user.id, requestedUser.id])
      const returnedRoom = await RoomService.getRoomById(room.id)

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
  }

  const joinRoom = async (roomId:string) => {
    socket.join(`room-${roomId}`)
  }

  socket.on("room:join", joinRoom);
  socket.on("room:new", createRoom);
}

export default roomHandler;