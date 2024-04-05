export const isSocketAuthenticated = (socket, next) => {
  return socket.data.user ? next() : next(new Error("Socket authentication error"));
}