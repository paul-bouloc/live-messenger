import { Server } from "socket.io";
import { extractSocketUserFromJwt } from "./middlewares/extractSocketUserFromJwt";
import { isSocketAuthenticated } from "./middlewares/isSocketAuthenticated";
import roomHandler from "./handlers/roomHandler";
import messageHandler from "./handlers/messageHandler";

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

    socket.join(`user-${socket.data.user.id}`)
    
    for (const roomId of socket.data.user.roomsIds) {
      socket.join(`room-${roomId}`);
    }

    roomHandler(io, socket);
    messageHandler(io, socket);
    
  });
}
