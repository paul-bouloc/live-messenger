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