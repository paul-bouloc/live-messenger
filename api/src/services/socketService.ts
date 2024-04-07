import messageHandler from '@/websocket/handlers/messageHandler';
import roomHandler from '@/websocket/handlers/roomHandler';
import { extractSocketUserFromJwt } from '@/websocket/middlewares/extractSocketUserFromJwt';
import { isSocketAuthenticated } from '@/websocket/middlewares/isSocketAuthenticated';
import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export class SocketService {
  private static instance: SocketService;
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

  private constructor(server) {
    this.io = new Server(server, {
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

    this.io.on('connection', (socket) => {
      console.log(socket.data.user.name + ' connected')

      socket.join(`user-${socket.data.user.id}`)
    
      for (const roomId of socket.data.user.roomsIds) {
        socket.join(`room-${roomId}`);
      }

      roomHandler(this.io, socket);
      messageHandler(this.io, socket);
    });
  }

  static Initialize(server) {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService(server);
    }
  }

  static getInstance() {
    if (!SocketService.instance) {
      throw new Error('SocketService instance not created');
    }
    return SocketService.instance.io;
  }

  
}