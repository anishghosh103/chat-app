module.exports = ({ Room }, { response, utils, eventEmitter }) => {
  return (req, res) => {
    const userId = req.user.userId;
    const roomId = req.params.id;
    
    verifyCreator()
      .then(removeRoom)
      .then(() => {
        response.generate(res, false, 'Room deleted successfully.', 200, null);
        eventEmitter.emit('deleted', roomId);
      })
      .catch(err => response.error(res, err));
    
    function verifyCreator() {
      return utils.promise(cb => {
        Room.verifyCreator(roomId, userId)
          .then(room => cb(null, room))
          .catch(err => cb(err));
      });
    }
  
    function removeRoom(room) {
      return utils.promise(cb => {
        room.remove(err => {
          if (err) cb(err);
          else cb(null);
        });
      });
    }
  };
};