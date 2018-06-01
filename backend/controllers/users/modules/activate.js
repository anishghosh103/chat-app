module.exports = ({ User }, { response, utils, logger }) => {
  return (req, res) => {
    const token = req.body.token;

    verifyToken()
      .then(getUser)
      .then(activateUser)
      .then(user => response.generate(res, false, 'Account activated successfully.', 200, user))
      .catch(err => response.error(res, err));

    function verifyToken() {
      return utils.promise(cb => {
        const decodedToken = utils.verifyJwt(token);
        if (decodedToken && decodedToken.type === 'verify' && decodedToken.data) {
          cb(null, decodedToken.data);
        }
        else {
          cb({ message: 'Invalid activation token.', status: 409, custom: true });
        }
      });
    }

    function getUser(userId) {
      return utils.promise(cb => {
        User.findOne({ userId })
          .exec()
          .then(user => {
            if (user)
              cb(null, user);
            else
              cb({ message: 'User not found.', status: 404, custom: true });
          })
          .catch(err => cb(err));
      });
    }
    
    function activateUser(user) {
      return utils.promise(cb => {
        user.verified = true;
        user.save((err, result) => {
          if (err)
            cb(err);
          else
            cb(null, result);
        });
      });
    }
  };
};