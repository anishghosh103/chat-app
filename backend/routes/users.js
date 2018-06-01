const express = require('express');

const router = express.Router();
const controller = require('../controllers/users');

const auth = require('../middlewares/auth');

/**
 * @api {get} /api/users/ Get details of the logged in user
 * @apiName GetUserDetails
 * @apiGroup User
 * @apiPermission User
 * 
 * @apiSuccessExample Success Response (200):
 * {
 *    error: false,
 *    message: "User details."
 *    status: 200,
 *    data: {
 *      userId: String,
 *      name: String,
 *      email: String,
 *      username: String,
 *      lastLogin: Date
 *      friends: [String],
 *      verified: Boolean
 *    }
 * }
 * 
 * @apiErrorExample Error Response (404):
 * {
 *    error: true,
 *    message: "User not found.",
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
router.get('/', auth.isAuthenticated, controller.getDetails);

/**
 * @api {get} /api/users/:id Get details of an user by Id
 * @apiName GetUserById
 * @apiGroup User
 * @apiPermission User
 * 
 * @apiParam {String} id User Id. (URL Parameter)
 * 
 * @apiSuccessExample Success Response (200):
 * {
 *    error: false,
 *    message: "User details."
 *    status: 200,
 *    data: {
 *      userId: String,
 *      name: String,
 *      email: String,
 *      username: String,
 *      lastLogin: Date
 *      friends: [String],
 *      verified: Boolean
 *    }
 * }
 * 
 * @apiErrorExample Error Response (404):
 * {
 *    error: true,
 *    message: "User not found.",
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
router.get('/:id', auth.isAuthenticated, controller.getUserById);

/**
 * @api {get} /api/users/:id/rooms Get details of rooms where the given user is a member of
 * @apiName GetJoinedRooms
 * @apiGroup User
 * @apiPermission User
 * 
 * @apiParam {String} id User Id. (URL Parameter)
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
 *    message: "User not found.",
 *    status: 404,
 *    data: null
 * }
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
router.get('/:id/rooms', auth.isAuthenticated, controller.getJoinedRooms);


/**
 * @api {put} /api/users/activate Activate the user
 * @apiName ActivateUser
 * @apiGroup User
 * 
 * @apiParam {String} token Activation token. (Body Parameter)
 * 
 * @apiSuccessExample Success Response (200):
 * {
 *    error: false,
 *    message: "Account activated successfully."
 *    status: 200,
 *    data: {
 *      userId: String,
 *      name: String,
 *      email: String,
 *      username: String,
 *      lastLogin: Date
 *      friends: [String],
 *      verified: Boolean
 *    }
 * }
 * 
 * @apiErrorExample Error Response (404):
 * {
 *    error: true,
 *    message: "User not found.",
 *    status: 404,
 *    data: null
 * }
 * @apiErrorExample Error Response (409):
 * {
 *    error: true,
 *    message: "Invalid activation token.",
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
router.put('/activate', auth.isNotAuthenticated, controller.activate);

/**
 * @api {put} /api/users/:id/reset-password Reset Password
 * @apiName ResetPassword
 * @apiGroup User
 * 
 * @apiParam {String} id User Id (URL Parameter)
 * @apiParam {String} password Password of the user. (Body Parameter)
 * 
 * @apiSuccessExample Success Response (200):
 * {
 *    error: false,
 *    message: "Password reset successful."
 *    status: 200,
 *    data: null
 * }
 * 
 * @apiErrorExample Error Response (404):
 * {
 *    error: true,
 *    message: "User not found.",
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
router.put('/:id/reset-password', auth.isNotAuthenticated, controller.resetPassword);


/**
 * @api {post} /api/users/login User Login
 * @apiName UserLogin
 * @apiGroup User
 * 
 * @apiParam {String} username Username of the user. (Body Parameter)
 * @apiParam {String} password Password of the user. (Body Parameter)
 * 
 * @apiSuccessExample Success Response (200):
 * {
 *    error: false,
 *    message: "Login successful."
 *    status: 200,
 *    data: {
 *      token: String
 *    }
 * }
 * 
 * @apiErrorExample Error Response (404):
 * {
 *    error: true,
 *    message: "User not found.",
 *    status: 404,
 *    data: null
 * }
 * @apiErrorExample Error Response (409):
 * {
 *    error: true,
 *    message: "User is not verified.",
 *    status: 409,
 *    data: null
 * }
 * @apiErrorExample Error Response (422):
 * {
 *    error: true,
 *    message: "Incorrect Password.",
 *    status: 422,
 *    data: null
 * }
 * @apiErrorExample Error Response (422):
 * {
 *    error: true,
 *    message: "Some field is empty.",
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
router.post('/login', auth.isNotAuthenticated, controller.login);

/**
 * @api {post} /api/users/signup User Registration
 * @apiName UserRegistration
 * @apiGroup User
 * 
 * @apiParam {String} name Name of the user. (Body Parameter)
 * @apiParam {String} email Email of the user. (Body Parameter)
 * @apiParam {String} username Username of the user. (Body Parameter)
 * @apiParam {String} password Password of the user. (Body Parameter)
 * 
 * @apiSuccessExample Success Response (200):
 * {
 *    error: false,
 *    message: "Registration successful."
 *    status: 200,
 *    data: {
 *      token: String
 *    }
 * }
 * 
 * @apiErrorExample Error Response (409):
 * {
 *    error: true,
 *    message: "Email already present.",
 *    status: 409,
 *    data: null
 * }
 * @apiErrorExample Error Response (409):
 * {
 *    error: true,
 *    message: "Username already exists.",
 *    status: 409,
 *    data: null
 * }
 * @apiErrorExample Error Response (422):
 * {
 *    error: true,
 *    message: "Some field is empty.",
 *    status: 422,
 *    data: null
 * }
 * @apiErrorExample Error Response (500):
 * {
 *    error: true,
 *    message: "Something went wrong. Please try again.",
 *    status: 500,
 *    date: null
 * }
 * @apiErrorExample Error Response (500):
 * {
 *    error: true,
 *    message: "Error occurred.",
 *    status: 500,
 *    date: null
 * }
 */
router.post('/signup', auth.isNotAuthenticated, controller.signup);

/**
 * @api {post} /api/users/:username/forgot-password Forgot Password
 * @apiName ForgotPassword
 * @apiGroup User
 * 
 * @apiParam {String} username Username of the user. (URL Parameter)
 * 
 * @apiSuccessExample Success Response (200):
 * {
 *    error: false,
 *    message: "Password Reset mail sent successfully."
 *    status: 200,
 *    data: null
 * }
 * 
 * @apiErrorExample Error Response (404):
 * {
 *    error: true,
 *    message: "User not found.",
 *    status: 404,
 *    data: null
 * }
 * @apiErrorExample Error Response (409):
 * {
 *    error: true,
 *    message: "User is not verified.",
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
router.post('/:username/forgot-password', auth.isNotAuthenticated, controller.forgotPassword);

/**
 * @api {post} /api/users/logout User Logout
 * @apiName UserRegistration
 * @apiGroup User
 * @apiPermission User
 * 
 * @apiSuccessExample Success Response (200):
 * {
 *    error: false,
 *    message: "Logout successful."
 *    status: 200,
 *    data: null
 * }
 * 
 * @apiErrorExample Error Response (500):
 * {
 *    error: true,
 *    message: "Error occurred.",
 *    status: 500,
 *    date: null
 * }
 */
router.post('/logout', auth.isAuthenticated, controller.logout);

module.exports = router;