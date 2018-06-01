const config = require('../../../config/app.config');

module.exports = ({ User }, { response, utils, logger }) => {
  return (req, res) => {
    const username = req.params.username;
  
    getUser()
      .then(checkIfUserIsVerified)
      .then(sendMail)
      .then(userId => response.generate(res, false, 'Password Reset mail sent successfully.', 200, null))
      .catch(err => {
        // logger.log('ForgotPassword.catch', err);
        response.error(res, err);
      });

    function getUser() {
      return utils.promise(cb => {
        User.findOne({ username })
          .exec()
          .then(user => {
            if (user) cb(null, user);
            else cb({ message: 'User not found', status: 404, custom: true });
          })
          .catch(err => cb(err));
      });
    }

    function checkIfUserIsVerified(user) {
      return utils.promise(cb => {
        if (user.verified) cb(null, user);
        else cb({ message: 'User is not verified.', status: 409, custom: true });
      });
    }
  
    function sendMail(user) {
      return utils.promise(cb => {
        const resetToken = utils.generateJwt({
          type: 'password-reset',
          data: user.userId
        });
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
    }
  };
};