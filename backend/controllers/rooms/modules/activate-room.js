module.exports = ({ Room }, { response, eventEmitter, addNotification }) => {
  return (req, res) => {
    const userId = req.user.userId;
    const roomId = req.params.id;

    Room.verifyCreator(roomId, userId)
      .then(room => {
        room.active = true;
        room.lastUpdated = Date.now();
        room.save((err, result) => {
          if (err) {
            response.error(res, err);
          } else {
            addNotification(roomId, `Room activated.`, userId, req.user.name);
            eventEmitter.emit('activated', roomId);
            response.generate(res, false, 'Room activated successfully.', 200, room);
          }
        });
      })
      .catch(err => response.error(res, err));
  };
};