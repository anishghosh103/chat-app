const express = require('express');
const router = express.Router();

const controller = require('../controllers/rooms');

const auth = require('../middlewares/auth');

/**
 * @api {get} /api/rooms/ Get all rooms
 * @apiName GetRooms
 * @apiGroup Rooms
 * @apiPermission User
 * 
 * @apiSuccessExample Success Response (200):
 * {
 *    error: false,
 *    message: "Rooms found."
 *    status: 200,
 *    data: [{
 *      roomId: String,
 *      name: String,
 *      description: String,
 *      creatorId: String,
 *      createdAt: String
 *      users: [{ userId: String, lastViewed: Date }],
 *      lastUpdated: Date,
 *      active: Boolean
 *    }]
 * }
 * 
 * @apiErrorExample Error Response (404):
 * {
 *    error: true,
 *    message: "No rooms found.",
 *    status: 404,
 *    data: null
 * }
 * @apiErrorExample Error Response (500):
 * {
 *    error: true,
 *    message: "Error occurred.",
 *    status: 500,
 *    date: null
 * }
 */
router.get('/', controller.getAllRooms);

/**
 * @api {get} /api/rooms/active Get all active rooms
 * @apiName GetActiveRooms
 * @apiGroup Rooms
 * @apiPermission User
 * 
 * @apiSuccessExample Success Response (200):
 * {
 *    error: false,
 *    message: "Rooms found.",
 *    status: 200,
 *    data: [{
 *      roomId: String,
 *      name: String,
 *      description: String,
 *      creatorId: String,
 *      createdAt: String
 *      users: [{ userId: String, lastViewed: Date }],
 *      lastUpdated: Date,
 *      active: Boolean
 *    }]
 * }
 * 
 * @apiErrorExample Error Response (404):
 * {
 *    error: true,
 *    message: "No active rooms found.",
 *    status: 404,
 *    data: null
 * }
 * @apiErrorExample Error Response (500):
 * {
 *    error: true,
 *    message: "Error occurred.",
 *    status: 500,
 *    date: null
 * }
 */
router.get('/active', controller.getActiveRooms);

/**
 * @api {get} /api/rooms/:id Get a particular room by Id
 * @apiName GetRoomById
 * @apiGroup Rooms
 * @apiPermission User
 * 
 * @apiParam {String} id Room Id (URL Parameter)
 * 
 * @apiSuccessExample Success Response (200):
 * {
 *    error: false,
 *    message: "Room details.",
 *    status: 200,
 *    data: {
 *      roomId: String,
 *      name: String,
 *      description: String,
 *      creatorId: String,
 *      createdAt: String
 *      users: [{ userId: String, lastViewed: Date }],
 *      lastUpdated: Date,
 *      active: Boolean
 *    }
 * }
 * 
 * @apiErrorExample Error Response (404):
 * {
 *    error: true,
 *    message: "Room not found.",
 *    status: 404,
 *    data: null
 * }
 * @apiErrorExample Error Response (500):
 * {
 *    error: true,
 *    message: "Error occurred.",
 *    status: 500,
 *    date: null
 * }
 */
router.get('/:id', controller.getRoomById);

/**
 * @api {get} /api/rooms/:id/updates Get all updates of a particular room
 * @apiName GetRoomUpdates
 * @apiGroup Rooms
 * @apiPermission User
 * 
 * @apiParam {String} id Room Id (URL Parameter)
 * @apiParam {Number} [skip=0] Number of updates to skip. (Query Parameter)
 * @apiParam {Number} [limit=20] Number of updates to show after skipping. (Query Parameter)
 * 
 * @apiSuccessExample Success Response (200):
 * {
 *    error: false,
 *    message: "Rooms updates.",
 *    status: 200,
 *    data: [{
 *      roomId: String,
 *      type: String, // 'chat' or 'notification'
 *      time: Date,
 *      message: String,
 *      senderId: String,
 *      senderName: String
 *    }]
 * }
 * 
 * @apiErrorExample Error Response (404):
 * {
 *    error: true,
 *    message: "No chats found.",
 *    status: 404,
 *    data: null
 * }
 * @apiErrorExample Error Response (500):
 * {
 *    error: true,
 *    message: "Error occurred.",
 *    status: 500,
 *    date: null
 * }
 */
router.get('/:id/updates', controller.getUpdates);


/**
 * @api {post} /api/rooms/ Create a new room
 * @apiName CreateRoom
 * @apiGroup Rooms
 * @apiPermission User
 * 
 * @apiParam {String} name Room name. (Body Parameter)
 * @apiParam {String} description Room description. (Body Parameter)
 * 
 * @apiSuccessExample Success Response (200):
 * {
 *    error: false,
 *    message: "Room created successfully.",
 *    status: 200,
 *    data: {
 *      roomId: String,
 *      name: String,
 *      description: String,
 *      creatorId: String,
 *      createdAt: String
 *      users: [{ userId: String, lastViewed: Date }],
 *      lastUpdated: Date,
 *      active: Boolean
 *    }
 * }
 * 
 * @apiErrorExample Error Response (409):
 * {
 *    error: true,
 *    message: "Name already exists.",
 *    status: 409,
 *    data: null
 * }
 * @apiErrorExample Error Response (422):
 * {
 *    error: true,
 *    message: "Name not provided.",
 *    status: 422,
 *    data: null
 * }
 * @apiErrorExample Error Response (500):
 * {
 *    error: true,
 *    message: "Error occurred.",
 *    status: 500,
 *    date: null
 * }
 */
router.post('/', controller.createRoom);

/**
 * @api {post} /api/rooms/:id/send-message Send a message to a room
 * @apiName SendMessage
 * @apiGroup Rooms
 * @apiPermission User
 * 
 * @apiParam {String} id Room Id. (URL Parameter)
 * @apiParam {String} message Message. (Body Parameter)
 * 
 * @apiSuccessExample Success Response (200):
 * {
 *    error: false,
 *    message: "Room created successfully.",
 *    status: 200,
 *    data: {
 *      roomId: String,
 *      type: String, // 'chat' or 'notification'
 *      time: Date,
 *      message: String,
 *      senderId: String,
 *      senderName: String
 *    }
 * }
 * 
 * @apiErrorExample Error Response (404):
 * {
 *    error: true,
 *    message: "Room not found.",
 *    status: 404,
 *    data: null
 * }
 * @apiErrorExample Error Response (422):
 * {
 *    error: true,
 *    message: "Message not provided.",
 *    status: 422,
 *    data: null
 * }
 * @apiErrorExample Error Response (500):
 * {
 *    error: true,
 *    message: "Error occurred.",
 *    status: 500,
 *    date: null
 * }
 */
router.post('/:id/send-message', controller.sendMessage);



/**
 * @api {post} /api/rooms/:id/send-invite-link Send invite link to an email
 * @apiName SendInviteLink
 * @apiGroup Rooms
 * @apiPermission User
 * 
 * @apiParam {String} id Room Id. (URL Parameter)
 * @apiParam {String} email Email address of the receiver. (Body Parameter)
 * 
 * @apiSuccessExample Success Response (200):
 * {
 *    error: false,
 *    message: "Link sent successfully.",
 *    status: 200,
 *    data: null
 * }
 * 
 * @apiErrorExample Error Response (404):
 * {
 *    error: true,
 *    message: "Room not found.",
 *    status: 404,
 *    data: null
 * }
 * @apiErrorExample Error Response (422):
 * {
 *    error: true,
 *    message: "Email not provided.",
 *    status: 422,
 *    data: null
 * }
 * @apiErrorExample Error Response (500):
 * {
 *    error: true,
 *    message: "Error occurred.",
 *    status: 500,
 *    date: null
 * }
 */
router.post('/:id/send-invite-link', controller.sendInviteLink);

/**
 * @api {put} /api/rooms/:id Update details of a room (name & description)
 * @apiName UpdateRoomDetails
 * @apiGroup Rooms
 * @apiPermission User
 * 
 * @apiParam {String} id Room Id. (URL Parameter)
 * @apiParam {String} [name] Name of the room. (Body Parameter)
 * @apiParam {String} [description] Description of the room. (Body Parameter)
 * 
 * @apiSuccessExample Success Response (200):
 * {
 *    error: false,
 *    message: "Room updated successfully.",
 *    status: 200,
 *    data: {
 *      roomId: String,
 *      name: String,
 *      description: String,
 *      creatorId: String,
 *      createdAt: String
 *      users: [{ userId: String, lastViewed: Date }],
 *      lastUpdated: Date,
 *      active: Boolean
 *    }
 * }
 * 
 * @apiErrorExample Error Response (401):
 * {
 *    error: true,
 *    message: "You are not authorized to modify this room.",
 *    status: 403,
 *    data: null
 * }
 * @apiErrorExample Error Response (404):
 * {
 *    error: true,
 *    message: "Room not found.",
 *    status: 404,
 *    data: null
 * }
 * @apiErrorExample Error Response (500):
 * {
 *    error: true,
 *    message: "Error occurred.",
 *    status: 500,
 *    date: null
 * }
 */
router.put('/:id', controller.updateRoomDetails);

/**
 * @api {put} /api/rooms/:id/join Join a room
 * @apiName JoinRoom
 * @apiGroup Rooms
 * @apiPermission User
 * 
 * @apiParam {String} id Room Id. (URL Parameter)
 * 
 * @apiSuccessExample Success Response (200):
 * {
 *    error: false,
 *    message: "Joined room successfully.",
 *    status: 200,
 *    data: {
 *      roomId: String,
 *      name: String,
 *      description: String,
 *      creatorId: String,
 *      createdAt: String
 *      users: [{ userId: String, lastViewed: Date }],
 *      lastUpdated: Date,
 *      active: Boolean
 *    }
 * }
 * 
 * @apiErrorExample Error Response (403):
 * {
 *    error: true,
 *    message: "Room is not active.",
 *    status: 403,
 *    data: null
 * }
 * @apiErrorExample Error Response (404):
 * {
 *    error: true,
 *    message: "Room not found.",
 *    status: 404,
 *    data: null
 * }
 * @apiErrorExample Error Response (409):
 * {
 *    error: true,
 *    message: "You are already a member of this room.",
 *    status: 409,
 *    data: null
 * }
 * @apiErrorExample Error Response (500):
 * {
 *    error: true,
 *    message: "Error occurred.",
 *    status: 500,
 *    date: null
 * }
 */
router.put('/:id/join', controller.joinRoom);

/**
 * @api {put} /api/rooms/:id/leave Leave a room
 * @apiName LeaveRoom
 * @apiGroup Rooms
 * @apiPermission User
 * 
 * @apiParam {String} id Room Id. (URL Parameter)
 * 
 * @apiSuccessExample Success Response (200):
 * {
 *    error: false,
 *    message: "Left room successfully.",
 *    status: 200,
 *    data: {
 *      roomId: String,
 *      name: String,
 *      description: String,
 *      creatorId: String,
 *      createdAt: String
 *      users: [{ userId: String, lastViewed: Date }],
 *      lastUpdated: Date,
 *      active: Boolean
 *    }
 * }
 * 
 * @apiErrorExample Error Response (404):
 * {
 *    error: true,
 *    message: "Room not found.",
 *    status: 404,
 *    data: null
 * }
 * @apiErrorExample Error Response (409):
 * {
 *    error: true,
 *    message: "You are not a member of this room.",
 *    status: 409,
 *    data: null
 * }
 * @apiErrorExample Error Response (500):
 * {
 *    error: true,
 *    message: "Error occurred.",
 *    status: 500,
 *    date: null
 * }
 */
router.put('/:id/leave', controller.leaveRoom);

/**
 * @api {put} /api/rooms/:id/deactivate Deactivate a room
 * @apiName DeactivatedRoom
 * @apiGroup Rooms
 * @apiPermission User
 * 
 * @apiParam {String} id Room Id. (URL Parameter)
 * 
 * @apiSuccessExample Success Response (200):
 * {
 *    error: false,
 *    message: "Room deactivated successfully.",
 *    status: 200,
 *    data: {
 *      roomId: String,
 *      name: String,
 *      description: String,
 *      creatorId: String,
 *      createdAt: String
 *      users: [{ userId: String, lastViewed: Date }],
 *      lastUpdated: Date,
 *      active: Boolean
 *    }
 * }
 * 
 * @apiErrorExample Error Response (401):
 * {
 *    error: true,
 *    message: "You are not authorized to modify this room",
 *    status: 401,
 *    data: null
 * }
 * @apiErrorExample Error Response (404):
 * {
 *    error: true,
 *    message: "Room not found.",
 *    status: 404,
 *    data: null
 * }
 * @apiErrorExample Error Response (500):
 * {
 *    error: true,
 *    message: "Error occurred.",
 *    status: 500,
 *    date: null
 * }
 */
router.put('/:id/deactivate', controller.deactivateRoom);

/**
 * @api {put} /api/rooms/:id/activate Activate a room
 * @apiName ActivateRoom
 * @apiGroup Rooms
 * @apiPermission User
 * 
 * @apiParam {String} id Room Id. (URL Parameter)
 * 
 * @apiSuccessExample Success Response (200):
 * {
 *    error: false,
 *    message: "Room activated successfully.",
 *    status: 200,
 *    data: {
 *      roomId: String,
 *      name: String,
 *      description: String,
 *      creatorId: String,
 *      createdAt: String
 *      users: [{ userId: String, lastViewed: Date }],
 *      lastUpdated: Date,
 *      active: Boolean
 *    }
 * }
 * 
 * @apiErrorExample Error Response (401):
 * {
 *    error: true,
 *    message: "You are not authorized to modify this room",
 *    status: 401,
 *    data: null
 * }
 * @apiErrorExample Error Response (404):
 * {
 *    error: true,
 *    message: "Room not found.",
 *    status: 404,
 *    data: null
 * }
 * @apiErrorExample Error Response (500):
 * {
 *    error: true,
 *    message: "Error occurred.",
 *    status: 500,
 *    date: null
 * }
 */
router.put('/:id/activate', controller.activateRoom);

/**
 * @api {put} /api/rooms/:id/update-last-viewed Update lastViewed time of a user
 * @apiName UpdateLastViewed
 * @apiGroup Rooms
 * @apiPermission User
 * 
 * @apiParam {String} id Room Id. (URL Parameter)
 * @apiParam {Date} lastViewed Last viewed time. (Body Parameter)
 * 
 * @apiSuccessExample Success Response (200):
 * {
 *    error: false,
 *    message: "Updated successfully.",
 *    status: 200,
 *    data: {
 *      roomId: String,
 *      name: String,
 *      description: String,
 *      creatorId: String,
 *      createdAt: String
 *      users: [{ userId: String, lastViewed: Date }],
 *      lastUpdated: Date,
 *      active: Boolean
 *    }
 * }
 * 
 * @apiErrorExample Error Response (404):
 * {
 *    error: true,
 *    message: "Room not found.",
 *    status: 404,
 *    data: null
 * }
 * @apiErrorExample Error Response (409):
 * {
 *    error: true,
 *    message: "You are not a member of this room",
 *    status: 409,
 *    data: null
 * }
 * @apiErrorExample Error Response (500):
 * {
 *    error: true,
 *    message: "Error occurred.",
 *    status: 500,
 *    date: null
 * }
 */
router.put('/:roomId/update-last-viewed', controller.updateLastViewed);


/**
 * @api {delete} /api/rooms/:id Delete a room
 * @apiName DeleteRoom
 * @apiGroup Rooms
 * @apiPermission User
 * 
 * @apiParam {String} id Room Id. (URL Parameter)
 * 
 * @apiSuccessExample Success Response (200):
 * {
 *    error: false,
 *    message: "Room deleted successfully.",
 *    status: 200,
 *    data: {
 *      roomId: String,
 *      name: String,
 *      description: String,
 *      creatorId: String,
 *      createdAt: String
 *      users: [{ userId: String, lastViewed: Date }],
 *      lastUpdated: Date,
 *      active: Boolean
 *    }
 * }
 * 
 * @apiErrorExample Error Response (401):
 * {
 *    error: true,
 *    message: "You are not authorized to modify this room",
 *    status: 401,
 *    data: null
 * }
 * @apiErrorExample Error Response (404):
 * {
 *    error: true,
 *    message: "Room not found.",
 *    status: 404,
 *    data: null
 * }
 * @apiErrorExample Error Response (500):
 * {
 *    error: true,
 *    message: "Error occurred.",
 *    status: 500,
 *    date: null
 * }
 */
router.delete('/:id', controller.deleteRoom);


module.exports = router;