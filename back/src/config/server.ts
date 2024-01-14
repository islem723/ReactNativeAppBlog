import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();

const http = createServer(app);

const io = new Server(http, {
  cors: {
    origin: '*',
    credentials: true,
    maxAge: 75 * 60 * 1000,
  },
});

io.on('connection', (socket) => {
  console.log('Client Connected.');

  socket.on('disconnect', function (data) {
    console.log('Client Disconnected.');
    socket.broadcast.emit('user_leave', data);
  });
});

export { app, io, http };
