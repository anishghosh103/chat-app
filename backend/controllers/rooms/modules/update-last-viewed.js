module.exports = ({ Room }, { utils, response, logger }) => {
  return (req, res) => {
    const userId = req.user.userId;
    const roomId = req.params.roomId;
    const lastViewed = req.body.lastViewed;

    logger.log('UserController.updateLastViewed', roomId);

    getRoom()
      .then(checkMembership)
      .then(updateRoom)
      .then(room => response.generate(res, false, 'Updated Successfully.', 200, room))
      .catch(err => response.error(res, err));
    
    function getRoom() {
      return utils.promise(cb => {
        Room.findOne({ roomId })
          .exec()
          .then(room => {
            if (room === null) {
              cb({ message: 'Room not found.', status: 404, custom: true });
            } else {
              cb(null, room);
            }
          })
          .catch(err => cb(err));
      });
    }
  
    function checkMembership(room) {
      return utils.promise(cb => {
        if (room.users.find(user => user.userId === userId)) {
          cb(null, room);
        } else {
          cb({ message: 'You are not a member of this room.', status: 409, custom: true });
        }
      });
    }
  
    function updateRoom(room) {
      return utils.promise(cb => {
        const user = room.users.find(user => user.userId === userId);
        user.lastViewed = lastViewed;
        room.save((err, result) => {
          if (err) cb(err);
          else cb(null, result);
        });
      });
    }
  };
};