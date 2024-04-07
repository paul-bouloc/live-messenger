import MessageService from '@/services/messageService';
import RoomService from '@/services/roomService';
import { SocketService } from '@/services/socketService';
import { Queue, Worker } from 'bullmq';

export const messageQueue = new Queue('messageQueue', {
  connection: {
    password: process.env.REDIS_PW,
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT
  }
});

const messageWorker = new Worker('messageQueue', async job => {
  
  try {
    const {roomId, content, user} = job.data;

    const room = await RoomService.getRoomById(roomId);

    if (!room) throw new Error('La conversation n\'existe pas.');

    const createdMessage = await MessageService.createMessage(roomId, user.id, content);
    const message = await MessageService.getMessageById(createdMessage.id);

    return message;

  }catch (error) {
    console.log(error);
  }

}, {
  connection: {
    password: process.env.REDIS_PW,
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT
  }
});

messageWorker.on('completed', job => {
  const io = SocketService.getInstance();
  io.to(`room-${job.data.roomId}`).emit("message:new", {roomId: job.data.roomId, message: job.returnvalue})
  console.log(`Job ${job.id} completed at ${new Date()}`);
})