module.exports = ({ Room }, { response, eventEmitter, addNotification }) => {
  return (req, res) => {
    const userId = req.user.userId;
    const roomId = req.params.id;

    Room.verifyCreator(roomId, userId)
      .then(room => {
        room.active = false;
        room.lastUpdated = Date.now();
        room.save((err, result) => {
          if (err) {
            response.error(res, err);
          } else {
            addNotification(roomId, `Room deactivated.`, userId, req.user.name);
            eventEmitter.emit('deactivated', roomId);
            response.generate(res, false, 'Room deactivated successfully.', 200, room);
          }
        });
      })
      .catch(err => response.error(res, err));
  };
};