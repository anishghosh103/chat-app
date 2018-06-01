const mongoose = require('mongoose');

let RoomUpdatesSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    index: true
  },
  type: {
    type: String,
    required: true,
    enum: ['chat', 'notification']
  },
  time: {
    type: Date,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  senderId: String,
  senderName: String
});

module.exports = mongoose.model('RoomUpdates', RoomUpdatesSchema);