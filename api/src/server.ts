require("dotenv").config();

import  app from ".";
const PORT = process.env.PORT || 3000

const errorHandler = (error:any) => {
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

app.on('error', errorHandler);
app.on('listening', () => {
  console.log(`Server listening on port ${PORT}`);
})

app.listen(PORT)