module.exports = ({ User }, { response, utils, logger }) => {
  return (req, res) => {
    const userId = req.params.id;
    const password = req.body.password;
  
    getUser()
      .then(updatePassword)
      .then(user => response.generate(res, false, 'Password reset successful.', 200, user))
      .catch(err => response.error(res, err));

    function getUser () {
      return utils.promise(cb => {
        User.findOne({ userId })
          .exec()
          .then(user => {
            if (user) cb(null, user);
            else cb({ message: 'User not found', status: 404, custom: true });
          })
          .catch(err => cb(err));
      });
    }
  
    function updatePassword (user) {
      return utils.promise(cb => {
        utils.encryptPassword(password)
          .then(newPassword => {
            user.password = newPassword;
            user.save((err, result) => {
              if (err) cb(err);
              else cb(null, result);
            });
          })
          .catch(err => cb(err));
      });
    }
  };
};