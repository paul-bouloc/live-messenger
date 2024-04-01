import  app from ".";
import * as http from 'http';
import * as dotenv from 'dotenv'
import validateEnv from '@utils/validateEnv'
import { Server } from "socket.io";
import { socketServer } from "./socket";

dotenv.config()
validateEnv();

const PORT = process.env.PORT

const serverErrorHandler = (error:any) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      console.error('Elevated privileges required.');
      process.exit(1);
    case 'EADDRINUSE':
      console.error('Port is already in use.');
      process.exit(1);
    default:
      throw error;
  }
};

app.set('port', PORT);

const server = http.createServer(app);
socketServer(server);

server.on('error', serverErrorHandler);
server.on('listening', () => {
  console.log(`Server listening on port ${PORT}`);
})

server.listen(PORT)