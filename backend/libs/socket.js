const socket = require('socket.io');

const logger = require('./logger');
const eventEmitter = require('./event-emitter');

const socketServer = {};

socketServer.setServer = (server) => {
  const io = socket(server);
  
  const roomIO = io.of('/room');
  const chatIO = io.of('/chat');

  let roomClients = 0;

  roomIO.on('connection', (socket) => {
    roomClients++;
    logger.log('RoomIO.Connection', roomClients + ' client connected');

    socket.on('typing', data => socket.broadcast.emit('typing', data));

    eventEmitter.on('deactivated', roomId => socket.emit('deactivated', roomId));
    
    eventEmitter.on('activated', roomId => socket.emit('activated', roomId));

    eventEmitter.on('update', data => socket.emit('update', data));

    eventEmitter.on('created', room => socket.emit('created', room));

    eventEmitter.on('joined', obj => socket.emit('joined', obj));

    eventEmitter.on('left', obj => socket.emit('left', obj));

    eventEmitter.on('deleted', roomId => socket.emit('deleted', roomId));

    socket.on('disconnect', () => {
      roomClients--;
      logger.log('RoomIO.Disconnect', roomClients + ' client connected');
    });
  });
};

module.exports = socketServer;