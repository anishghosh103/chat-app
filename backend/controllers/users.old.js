const jwt = require('jsonwebtoken');
const shortid = require('shortid');

const User = require('../models/users');
const Room = require('../models/rooms');
const RoomUpdates = require('../models/room-updates');

const config = require('../config/app.config');
const response = require('../libs/response');
const utils = require('../libs/utils');
const logger = require('../libs/logger');

const controller = {};

controller.getDetails = (req, res) => {
  const user = req.user;
  if (user) {
    response.generate(res, false, 'User details.', 200, user);
  } else {
    response.error(res, 'User not found.', 404);
  }
};

controller.getUserById = (req, res) => {
  const userId = req.params.id;
  User.findOne({ userId })
    .select('-_id -__v -password')
    .exec()
    .then(user => {
      if (user === null) response.error(res, 'User not found.', 404);
      else response.generate(res, false, 'User details.', 200, user);
    })
    .catch(err => response.error(res, err));
};

controller.getJoinedRooms = (req, res) => {
  const userId = req.params.id;

  let verifyUser = () => {
    return utils.promise(cb => {
      User.findOne({ userId })
        .exec()
        .then(user => {
          if (user) cb(null);
          else cb({ message: 'User Not Found.', status: 404, custom: true });
        })
        .catch(err => cb(err));
    });
  };

  let getRooms = () => {
    return utils.promise(cb => {
      Room.find({ "users.userId": userId })
        .select('-_id -__v')
        .lean()
        .exec()
        .then(rooms => {
          if (rooms) cb(null, rooms);
          else cb({ message: 'No rooms found.', status: 404, custom: true });
        })
        .catch(err => cb(err));
    });
  };

  let getNotificationCount = (rooms) => {
    return utils.promise(cb => {
      let len = rooms.length;
      let stop = false;
      rooms.forEach((room, index) => {
        if (stop) return;
        const lastViewed = room.users.find(user => user.userId === userId).lastViewed;
        RoomUpdates.find({ roomId: room.roomId, time: { "$gte": lastViewed } })
          .count((err, count) => {
            if (err) {
              cb(err);
              stop = true;
            } else {
              logger.log('UserController.GetJoinedRooms.getNotificationCount', count);
              rooms[index].notification = count;
              if (--len === 0) {
                cb(null, rooms);
              }
            }
          });
      });
    });
  };

  verifyUser()
    .then(getRooms)
    .then(getNotificationCount)
    .then(rooms => response.generate(res, false, 'Rooms Found.', 200, rooms))
    .catch(err => response.error(res, err));
};

controller.activate = (req, res) => {
  const token = req.body.token;

  let verifyToken = () => {
    return utils.promise(cb => {
      const decodedToken = jwt.verify(token, config.secret);
      logger.log('UserController.Activate.verifyToken', JSON.stringify(decodedToken));
      if (decodedToken && decodedToken.type === 'verify' && decodedToken.data) {
        cb(null, decodedToken.data);
      } else {
        cb({ message: 'Invalid activation token.', status: 409, custom: true });
      }
    });
  };

  let getUser = (userId) => {
    return utils.promise(cb => {
      User.findOne({ userId })
        .exec()
        .then(user => {
          if (user) cb(null, user);
          else cb({ message: 'User not found.', status: 404, custom: true });
        })
        .catch(err => cb(err));
    });
  };

  let activateUser = (user) => {
    return utils.promise(cb => {
      user.verified = true;
      user.save((err, result) => {
        logger.log('UserController.Activate.activateUser', result);
        if (err) cb(err);
        else cb(null, result);
      });
    });
  };

  verifyToken()
    .then(getUser)
    .then(activateUser)
    .then(user => response.generate(res, false, 'Account activated successfully.', 200, user))
    .catch(err => response.error(res, err));
};

controller.resetPassword = (req, res) => {
  const userId = req.params.id;
  const password = req.body.password;

  logger.log('UserController.ResetPassword', userId);

  let getUser = () => {
    return utils.promise(cb => {
      User.findOne({ userId })
        .exec()
        .then(user => {
          if (user) cb(null, user);
          else cb({ message: 'User not found', status: 404, custom: true });
        })
        .catch(err => cb(err));
    });
  };

  let updatePassword = (user) => {
    return utils.promise(cb => {
      utils.encryptPassword(password)
        .then(newPassword => {
          logger.log('UserController.ResetPassword.updatePassword.encrypt', newPassword);
          user.password = newPassword;
          user.save((err, result) => {
            if (err) cb(err);
            else cb(null, result);
          });
        })
        .catch(err => cb(err));
    });
  };

  getUser()
    .then(updatePassword)
    .then(user => response.generate(res, false, 'Password reset successful.', 200, user))
    .catch(err => response.error(res, err));
};

controller.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {

    let checkUser = (user) => {
      return utils.promise(cb => {
        User.findOne({ username })
          .exec()
          .then(user => {
            if (user === null) {
              cb({ message: 'User not found.', status: 404, custom: true });
            } else {
              logger.log('UserController.Login.checkUser', user);
              cb(null, user);
            }
          })
          .catch(err => cb(err));
      });
    };

    let checkIfUserIsVerified = (user) => {
      return utils.promise(cb => {
        if (user.verified) {
          cb(null, user);
        } else {
          cb({ message: 'User is not verified.', status: 409, custom: true });
        }
      });
    };

    let verifyPassword = (user) => {
      return utils.promise(cb => {
        user.verifyPassword(password)
          .then(same => {
            logger.log('UserController.Login.verifyPassword', same);
            if (!same) {
              cb({ message: 'Incorrect Password.', status: 422, custom: true });
            } else {
              cb(null, user.userId);
            }
          })
          .catch(err => cb(err));
      });
    };

    let generateToken = (userId) => {
      const token = jwt.sign({ userId }, config.secret);
      res.cookie('authToken', token);
      response.generate(res, false, 'Login successful.', 200, { token });
    };

    checkUser()
      .then(checkIfUserIsVerified)
      .then(verifyPassword)
      .then(generateToken)
      .catch(err => response.error(res, err));

  } else {
    response.error(res, 'Some field is empty.', 422);
  }
};

controller.signup = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  if (name && email && username && password) {

    let validateEmail = () => {
      return utils.promise(cb => {
        User.findOne({ email })
          .then(doc => {
            if (doc) {
              cb({ message: 'Email already present.', status: 409, custom: true });
            } else {
              cb(null);
            }
          })
          .catch(err => cb(err));
      });
    };

    let validateUsername = () => {
      return utils.promise(cb => {
        User.findOne({ username })
          .then(doc => {
            if (doc) cb({ message: 'Username already exists.', status: 409, custom: true });
            else cb(null);
          })
          .catch(err => cb(err));
      });
    };

    let addUser = () => {
      return utils.promise(cb => {
        logger.log('UserController.Signup.addUser', password);
        const user = new User({
          userId: shortid.generate(),
          name,
          email,
          username,
          password,
          verified: false
        });
        user.save((err, result) => {
          if (err) cb(err);
          else cb(null, result);
        });
      });
    };

    let sendActivationMail = (user => {
      return utils.promise(cb => {
        const activationToken = jwt.sign(
          { type: 'verify', data: user.userId },
          config.secret
        );
        to = user.email;
        subject = 'Email Verfication.';
        message = `Hello ${user.name},<br /><br /><br />Your account has been created. To activate your account, please click the link:<br /><br /><a href="${config.baseUrl}/activate/${activationToken}">Activation Link</a>`;
        utils.sendMail(to, subject, message, (err) => {
          if (err) {
            cb({ message: 'Something went wrong. Please try again.', status: 500, custom: true });
          } else {
            cb(null, user.userId);
          }
        });
      });
    });

    let generateToken = (userId) => {
      const token = jwt.sign({ userId }, config.secret);
      // res.cookie('authToken', token);
      response.generate(res, false, 'Registration successful.', 200, { token });
    };

    validateEmail()
      .then(validateUsername)
      .then(addUser)
      .then(sendActivationMail)
      .then(generateToken)
      .catch(err => response.error(res, err));

  } else {
    response.error(res, 'Some field is empty.', 422);
  }
};

controller.forgotPassword = (req, res) => {
  const username = req.params.username;

  let getUser = () => {
    return utils.promise(cb => {
      User.findOne({ username })
        .exec()
        .then(user => {
          if (user) cb(null, user);
          else cb({ message: 'User not found', status: 404, custom: true });
        })
        .catch(err => cb(err));
    });
  };

  let sendMail = (user) => {
    return utils.promise(cb => {
      const resetToken = jwt.sign(
        { type: 'password-reset', data: user.userId },
        config.secret
      );
      to = user.email;
      subject = 'Reset Password.';
      message = `Hello ${user.name},<br /><br /><br />We got a request to reset your password. To reset your password, please click the link:<br /><br /><a href="${config.baseUrl}/reset/${resetToken}">Reset Password Link</a>`;
      utils.sendMail(to, subject, message, (err) => {
        if (err) {
          cb({ message: 'Something went wrong. Please try again.', status: 500, custom: true });
        } else {
          cb(null, user.userId);
        }
      });
    });
  };

  getUser()
    .then(sendMail)
    .then(userId => response.generate(res, false, 'Password Reset mail sent successfully.', 200, null))
    .catch(err => response.error(res, err));
};

controller.logout = (req, res) => {
  res.clearCookie('authToken');
  response.generate(res, false, 'Logout successful.', 200, null);
};

module.exports = controller;