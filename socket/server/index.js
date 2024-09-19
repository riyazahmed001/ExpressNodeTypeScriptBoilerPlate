const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());

const PORT = 3000;

let client = 1;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

io.on('connection', (socket) => {
  /**
   * We can use this socket id and set it in session to uniquely identify subsequent request
   */
  console.log('Client connected', socket.id);

  socket.on('pushDataToClient', (clientId, data) => {
    console.log("client id" , clientId)
    console.log("data", data)
    // Emit data to the specified client
    io.to(clientId).emit('dataFromServer', data);
  });

  socket.on('dataForClient', (data) => {
    // Handle data sent from the client
    console.log('Data received from the client:', data);

    // Send a response back to the client (if needed)
    socket.emit('responseToClient', { message: 'Data received by the server.' });
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Your data generation logic
function generateData() {
  return {
    timestamp: new Date().toLocaleString(),
    value: Math.random(),
  };
}

// Periodically emit data to connected clients
setInterval(() => {
  const data = generateData();
  io.emit('dataUpdate', data);
}, 2000); // Change the interval as needed
