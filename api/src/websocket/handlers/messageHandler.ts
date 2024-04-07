import { Server, Socket } from 'socket.io';
import { User } from "@prisma/client";
import { messageQueue } from '@/queue/messageQueue';

const messageHandler = (io: Server, socket: Socket) => {

  const addMessage = async (payload:{roomId:string, content:string}, callback:CallableFunction) => {
    const {roomId, content} = payload;
    const user = <User>socket.data.user;
    console.log('addMessage')
    messageQueue.add('addMessage', {roomId, content, user});
  }

  socket.on("message:new", addMessage);

}

export default messageHandler;

// const messageHandler = (io: Server, socket: Socket) => {
//   const addMessage = async (payload:{roomId:string, content:string}, callback:CallableFunction) => {

//     messageQueue.add('addMessage', {io, socket, payload});


//     try {
//       const {roomId, content} = payload;
//       const user = <User>socket.data.user;

//       const room = await RoomService.getRoomById(roomId);

//       if (!room) throw new Error('La conversation n\'existe pas.');

//       const createdMessage = await MessageService.createMessage(roomId, user.id, content);
//       const message = await MessageService.getMessageById(createdMessage.id);

//       io.to(`room-${roomId}`).emit("message:new", {roomId, message})

//     } catch (error) {
//       callback(<SocketResponse>{
//         success: false,
//         message: error.message || 'Erreur lors de la création de la conversation.'
//       })
//     }
//   }

//   socket.on("message:new", addMessage);
// }
