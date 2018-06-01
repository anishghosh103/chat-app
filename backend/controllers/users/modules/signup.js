const shortid = require('shortid');
const config = require('../../../config/app.config');

module.exports = ({ User }, { response, utils, logger }) => {
  return (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    if (!name || !email || !username || !password) {
      response.error(res, 'Some field is empty.', 422);
    }
  
    
    validateEmail()
      .then(validateUsername)
      .then(addUser)
      .then(sendActivationMail)
      .then(generateToken)
      .catch(err => {
        logger.log('Signup.catch', err);
        response.error(res, err);
      });
  
    function validateEmail() {
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
    }

    function validateUsername() {
      return utils.promise(cb => {
        User.findOne({ username })
          .then(doc => {
            if (doc) cb({ message: 'Username already exists.', status: 409, custom: true });
            else cb(null);
          })
          .catch(err => cb(err));
      });
    }

    function addUser() {
      return utils.promise(cb => {
        const user = new User({
          userId: shortid.generate(),
          name, email, username, password,
          verified: false
        });
        user.save((err, result) => {
          if (err) cb(err);
          else cb(null, result);
        });
      });
    }

    function sendActivationMail(user) {
      return utils.promise(cb => {
        const activationToken = utils.generateJwt({ type: 'verify', data: user.userId });
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
    }

    function generateToken(userId) {
      const token = utils.generateJwt({ userId });
      // res.cookie('authToken', token);
      response.generate(res, false, 'Registration successful.', 200, { token });
    }
  };
};