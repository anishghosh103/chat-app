module.exports = ({ User }, { response, utils, logger }) => {
  return (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      response.error(res, 'Some field is empty.', 422);
    }

    checkUser()
      .then(checkIfUserIsVerified)
      .then(verifyPassword)
      .then(generateToken)
      .catch(err => response.error(res, err));
  
    function checkUser() {
      return utils.promise(cb => {
        User.findOne({ username })
          .exec()
          .then(user => {
            if (user === null) {
              cb({ message: 'User not found.', status: 404, custom: true });
            } else {
              cb(null, user);
            }
          })
          .catch(err => cb(err));
      });
    }

    function checkIfUserIsVerified(user) {
      return utils.promise(cb => {
        if (user.verified) {
          cb(null, user);
        } else {
          cb({ message: 'User is not verified.', status: 409, custom: true });
        }
      });
    }

    function verifyPassword(user) {
      return utils.promise(cb => {
        user.verifyPassword(password)
          .then(same => {
            if (!same) {
              cb({ message: 'Incorrect Password.', status: 422, custom: true });
            } else {
              cb(null, user.userId);
            }
          })
          .catch(err => cb(err));
      });
    }

    function generateToken(userId) {
      const token = utils.generateJwt({ userId });
      res.cookie('authToken', token);
      response.generate(res, false, 'Login successful.', 200, { token });
    }
  };
};