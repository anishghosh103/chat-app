module.exports = ({ Room }, { response, utils, eventEmitter, addNotification }) => {
  return (req, res) => {
    const userId = req.user.userId;
    const userName = req.user.name;
    const roomId = req.params.id;

    getRoom()
      .then(checkIfRoomIsActive)
      .then(addUserToRoom)
      .then(room => {
        response.generate(res, false, 'Joined room successfully.', 200, room);
        eventEmitter.emit('joined', { roomId, userId, userName });
        addNotification(room.roomId, `joined`, userId, userName);
      })
      .catch(err => response.error(res, err));
    
    function getRoom() {
      return utils.promise(cb => {
        Room.findOne({ roomId })
          .exec()
          .then(room => {
            if (room) cb(null, room);
            else cb({ message: 'Room Not Found.', status: 404, custom: true });
          })
          .catch(err => cb(err));
      });
    }

    function checkIfRoomIsActive(room) {
      return utils.promise(cb => {
        if (room.active) cb(null, room);
        else cb({ message: 'Room is not active.', status: 403, custom: true });
      });
    }
  
    function addUserToRoom(room) {
      return utils.promise(cb => {
        if (room.users.find(user => user.userId === userId)) {
          cb({ message: 'You are already a member of this room.', status: 409, custom: true });
        } else {
          room.users.push({ userId, lastViewed: Date.now() });
          room.lastUpdated = Date.now();
          room.save((err, result) => {
            if (err) cb(err);
            else cb(null, result);
          });
        }
      });
    }
  };
};