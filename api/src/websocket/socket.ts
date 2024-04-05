import { Server } from "socket.io";
import { extractSocketUserFromJwt } from "./middlewares/extractSocketUserFromJwt";
import { isSocketAuthenticated } from "./middlewares/isSocketAuthenticated";
import roomHandler from "./handlers/roomHandler";

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

    roomHandler(io, socket);
    
  });
}
