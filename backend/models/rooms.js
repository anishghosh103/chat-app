const mongoose = require('mongoose');

const utils = require('../libs/utils');

let RoomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    default: ''
  },
  creatorId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date
  },
  users: [{
    userId: String,
    lastViewed: Date
  }],
  lastUpdated: {
    type: Date
  },
  active: {
    type: Boolean,
    default: true
  }
});

RoomSchema.pre('save', function (next) {
  const room = this;
  if (!room.createdAt) {
    room.lastUpdated = Date.now();
    room.createdAt = room.lastUpdated;
    room.users = [ { userId: room.creatorId, lastViewed: room.lastUpdated } ];
  }
  next();
});

RoomSchema.statics.verifyCreator = function (roomId, userId) {
  return utils.promise(cb => {
    this.findOne({ roomId })
      .exec()
      .then(room => {
        if (room) {
          if (room.creatorId === userId) {
            cb(null, room);
          } else {
            cb({
              message: 'You are not authorized to modify this room.',
              status: 401,
              custom: true
            });
          }
        } else {
          cb({ message: 'Room not found.', status: 404, custom: true });
        }
      })
      .catch(err => cb(err));
  });
};

module.exports = mongoose.model('Room', RoomSchema);