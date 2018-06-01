const models = require('../../models');

const libs = require('../../libs');
libs.addNotification = require('./modules/add-notification')(models.RoomUpdates);

const controller = {};

controller.getAllRooms = require('./modules/get-all-rooms')(models, libs);
controller.getActiveRooms = require('./modules/get-active-rooms')(models, libs);
controller.getRoomById = require('./modules/get-room-by-id')(models, libs);
controller.getUpdates = require('./modules/get-updates')(models, libs);
controller.createRoom = require('./modules/create-room')(models, libs);
controller.updateRoomDetails = require('./modules/update-room-details')(models, libs);
controller.sendMessage = require('./modules/send-message')(models, libs);
controller.sendInviteLink = require('./modules/send-invite-link')(models, libs);
controller.joinRoom = require('./modules/join-room')(models, libs);
controller.leaveRoom = require('./modules/leave-room')(models, libs);
controller.deactivateRoom = require('./modules/deactivate-room')(models, libs);
controller.activateRoom = require('./modules/activate-room')(models, libs);
controller.updateLastViewed = require('./modules/update-last-viewed')(models, libs);
controller.deleteRoom = require('./modules/delete-room')(models, libs);

module.exports = controller;