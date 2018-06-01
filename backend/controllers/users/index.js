const models = require('../../models');
const libs = require('../../libs');

const controller = {};

controller.getDetails = require('./modules/get-details')(models, libs);
controller.getUserById = require('./modules/get-user-by-id')(models, libs);
controller.getJoinedRooms = require('./modules/get-joined-rooms')(models, libs);
controller.activate = require('./modules/activate')(models, libs);
controller.resetPassword = require('./modules/reset-password')(models, libs);
controller.login = require('./modules/login')(models, libs);
controller.signup = require('./modules/signup')(models, libs);
controller.forgotPassword = require('./modules/forgot-password')(models, libs);
controller.logout = require('./modules/logout.js')(models, libs);

module.exports = controller;
