const config = require('../../../config/app.config');

module.exports = ({ Room }, { response, utils }) => {
  return (req, res) => {
    const roomId = req.params.id;
    const email = req.body.email;
    
    if (!email) {
      response.error(res, 'Email not provided.', 422);
      return;
    }

    checkRoom()
      .then(sendLink)
      .then(() => response.generate(res, false, 'Link sent successfully.', 200, null))
      .catch(err => response.error(res, err));
    
    function checkRoom() {
      return utils.promise(cb => {
        Room.findOne({ roomId })
          .exec()
          .then(room => {
            if (room) cb(null);
            else cb({ message: 'Room Not Found.', status: 404, custom: true });
          })
          .catch(err => cb(err));
      });
    }
  
    function sendLink() {
      return utils.promise(cb => {
        const inviteUrl = `${config.baseUrl}/invite/${roomId}`;
        utils.sendMail(email, 'Chat Room Invitation Link.', `Hi,<br><br>${req.user.name} has send an invitation link to join a chat room. Click the link below to accept the invitation:<br><a href='${inviteUrl}'>${inviteUrl}</a>`, (err) => {
          if (err) cb(err);
          else cb(null);
        });
      });
    }
  };
};