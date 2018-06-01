module.exports = ({ Room }, { response, utils, eventEmitter, addNotification }) => {
  return (req, res) => {
    const userId = req.user.userId;
    const userName = req.user.name;
    const roomId = req.params.id;

    getRoom()
      .then(removeUserFromRoom)
      .then(room => {
        response.generate(res, false, 'Left room successfully.', 200, room);
        eventEmitter.emit('left', { roomId, userId, userName });
        addNotification(room.roomId, `left`, userId, userName);
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
  
    function removeUserFromRoom(room) {
      return utils.promise(cb => {
        const user = room.users.find(user => user.userId === userId);
        if (user) {
          room.users.splice(room.users.indexOf(user), 1);
          room.lastUpdated = Date.now();
          room.save((err, result) => {
            if (err) cb(err);
            else cb(null, result);
          });
        } else {
          cb({ message: 'You are not a member of this room.', status: 409, custom: true });
        }
      });
    }
  };
};